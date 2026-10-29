$ErrorActionPreference = 'Stop'
$Project = 'C:\Users\KENAAR\Documents\Codex\2026-10-13\create-a-new-github-repository-named\work\pharos-docs-mcp-onboarding'
$Repository = 'https://github.com/shoupeorg/pharos-docs-mcp-onboarding.git'
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
