$ErrorActionPreference = 'Stop'
$Project = 'C:\Users\KENAAR\Documents\Codex\2026-10-13\create-a-new-github-repository-named\work\pharos-docs-mcp-onboarding'
$Repository = 'https://github.com/shoupeorg/pharos-docs-mcp-onboarding.git'
$Base = 'https://pharos-docs-mcp-onboarding.shoupeorg.workers.dev'
Set-Location -LiteralPath $Project

git -c "safe.directory=$Project" status --short
if ($LASTEXITCODE -ne 0) { throw "git status failed with exit code $LASTEXITCODE" }

$origin = git -c "safe.directory=$Project" remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
  git -c "safe.directory=$Project" remote add origin $Repository
  if ($LASTEXITCODE -ne 0) { throw "git remote add failed with exit code $LASTEXITCODE" }
} elseif ($origin.Trim() -ne $Repository) {
  throw "Unexpected origin: $origin"
}

git ls-remote $Repository HEAD | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Repository is unavailable. Create the empty public repository shoupeorg/pharos-docs-mcp-onboarding, then rerun this same script." }

git -c "safe.directory=$Project" push -u origin main
if ($LASTEXITCODE -ne 0) { throw "git push failed with exit code $LASTEXITCODE" }

git -c "safe.directory=$Project" fetch origin main
if ($LASTEXITCODE -ne 0) { throw "git fetch failed with exit code $LASTEXITCODE" }
$local = (git -c "safe.directory=$Project" rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw "local rev-parse failed with exit code $LASTEXITCODE" }
$remote = (git -c "safe.directory=$Project" rev-parse origin/main).Trim()
if ($LASTEXITCODE -ne 0) { throw "remote rev-parse failed with exit code $LASTEXITCODE" }
if ($local -ne $remote) { throw "Commit mismatch: local=$local remote=$remote" }

$required = git -c "safe.directory=$Project" ls-tree -r --name-only origin/main
if ($LASTEXITCODE -ne 0) { throw "remote tree check failed with exit code $LASTEXITCODE" }
foreach ($file in @('README.md','onboarding-log.md','gaps.md','evidence/manifest.json','public/index.html')) {
  if ($required -notcontains $file) { throw "Required remote file missing: $file" }
}
Write-Host "PUBLICATION VERIFIED: $remote" -ForegroundColor Green

npx wrangler deploy
if ($LASTEXITCODE -ne 0) { throw "Cloudflare deployment failed with exit code $LASTEXITCODE" }

$page = Invoke-WebRequest -UseBasicParsing -Uri $Base -TimeoutSec 30
if ($page.StatusCode -ne 200 -or $page.Content -notmatch 'Pharos Docs MCP Onboarding') { throw 'Public report verification failed.' }
$manifest = Invoke-WebRequest -UseBasicParsing -Uri "$Base/evidence/manifest.json" -TimeoutSec 30
if ($manifest.StatusCode -ne 200 -or $manifest.Content -notmatch 'docs-mcp-onboarding/1.0.0') { throw 'Public evidence verification failed.' }
foreach ($path in @('/onboarding-log.md','/gaps.md','/pharos-logo.png')) {
  $response = Invoke-WebRequest -UseBasicParsing -Uri "$Base$path" -TimeoutSec 30
  if ($response.StatusCode -ne 200) { throw "Public asset verification failed: $path" }
}
Write-Host "DEPLOYMENT VERIFIED: $Base" -ForegroundColor Green
