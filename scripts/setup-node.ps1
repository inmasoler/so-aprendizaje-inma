# Descarga Node.js 24 solo para este proyecto (.tools/node/)
# No modifica el Node global del sistema.

$ErrorActionPreference = "Stop"
$Version = "24.12.0"
$Root = Split-Path -Parent $PSScriptRoot
$ToolsDir = Join-Path $Root ".tools\node"
$Marker = Join-Path $ToolsDir "node.exe"

if (Test-Path $Marker) {
  Write-Host "Node $Version ya instalado en .tools/node/"
  & $Marker -v
  exit 0
}

$ZipName = "node-v$Version-win-x64.zip"
$Url = "https://nodejs.org/dist/v$Version/$ZipName"
$TempZip = Join-Path $env:TEMP $ZipName
$ExtractDir = Join-Path $Root ".tools\_extract"

Write-Host "Descargando Node $Version..."
Invoke-WebRequest -Uri $Url -OutFile $TempZip -UseBasicParsing

Write-Host "Extrayendo a .tools/node/..."
if (Test-Path $ExtractDir) { Remove-Item $ExtractDir -Recurse -Force }
New-Item -ItemType Directory -Path $ExtractDir -Force | Out-Null
Expand-Archive -Path $TempZip -DestinationPath $ExtractDir -Force

$Inner = Get-ChildItem $ExtractDir -Directory | Select-Object -First 1
New-Item -ItemType Directory -Path (Split-Path $ToolsDir) -Force | Out-Null
Move-Item $Inner.FullName $ToolsDir -Force
Remove-Item $ExtractDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $TempZip -Force -ErrorAction SilentlyContinue

Write-Host "Listo:"
& $Marker -v
