@echo off
setlocal
set "NODE_DIR=%~dp0..\.tools\node"
if not exist "%NODE_DIR%\node.exe" (
  echo [CraftBase] Node 24 local no encontrado. Ejecuta: npm run setup
  exit /b 1
)
set "PATH=%NODE_DIR%;%PATH%"
"%NODE_DIR%\npm.cmd" %*
