$ErrorActionPreference = "Stop"
$Project = "C:\Users\KENAAR\Documents\Codex\2026-10-13\create-a-new-github-repository-named\work\pharos-docs-mcp-onboarding"
$Repository = "https://github.com/shoupeorg/pharos-docs-mcp-onboarding.git"
Set-Location -LiteralPath $Project
git config --global --add safe.directory $Project
if ($LASTEXITCODE -ne 0) { throw "safe.directory failed: $LASTEXITCODE" }
$remotes = @(git remote)
if ($LASTEXITCODE -ne 0) { throw "remote inspection failed: $LASTEXITCODE" }
if ($remotes -contains "origin") { git remote set-url origin $Repository } else { git remote add origin $Repository }
if ($LASTEXITCODE -ne 0) { throw "origin configuration failed: $LASTEXITCODE" }
git ls-remote $Repository HEAD | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Repository unavailable. Create the empty public repository first: https://github.com/new?owner=shoupeorg&name=pharos-docs-mcp-onboarding&visibility=public" }
git push -u origin main
if ($LASTEXITCODE -ne 0) { throw "push failed: $LASTEXITCODE" }
git fetch origin main
if ($LASTEXITCODE -ne 0) { throw "verification fetch failed: $LASTEXITCODE" }
$local = (git rev-parse HEAD).Trim()
if ($LASTEXITCODE -ne 0) { throw "local HEAD failed: $LASTEXITCODE" }
$remote = (git rev-parse origin/main).Trim()
if ($LASTEXITCODE -ne 0) { throw "remote HEAD failed: $LASTEXITCODE" }
if ($local -ne $remote) { throw "commit mismatch: local=$local remote=$remote" }
$files = @(git ls-tree -r --name-only origin/main)
if ($LASTEXITCODE -ne 0) { throw "remote tree inspection failed: $LASTEXITCODE" }
foreach ($required in @("final-report.md", "evidence/v1.2-docs-agent-answer.md", "evidence/v1.1-user-delegation-dns-failure.json")) { if ($files -notcontains $required) { throw "missing remote file: $required" } }
Write-Host "PUBLICATION VERIFIED: $remote" -ForegroundColor Green
Write-Host "Report: https://github.com/shoupeorg/pharos-docs-mcp-onboarding/blob/main/final-report.md"