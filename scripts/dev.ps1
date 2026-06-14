# CraftBase — servidor local + abrir navegador
# Requiere Node en .tools/node/ (scripts/setup-node.ps1 si falta)

$ErrorActionPreference = "Stop"
$Port = 4321
$Root = Split-Path -Parent $PSScriptRoot
$Launcher = Join-Path $Root "scripts\mcp-npx.cmd"

if (-not (Test-Path (Join-Path $Root ".tools\node\node.exe"))) {
  Write-Host "Node local no encontrado. Ejecuta primero:"
  Write-Host "  powershell -ExecutionPolicy Bypass -File scripts\setup-node.ps1"
  exit 1
}

$url = "http://localhost:$Port"
Write-Host "CraftBase → $url"
Write-Host "Ctrl+C para parar el servidor."
Start-Process $url

Set-Location $Root
& cmd /c "`"$Launcher`" serve . -l $Port"
