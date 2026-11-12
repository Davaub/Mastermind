@echo off
setlocal
cd /d "%~dp0"

rem Utiliser Node.js installe dans Windows, s'il est disponible.
set "CODE_SECRET_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined CODE_SECRET_NODE set "CODE_SECRET_NODE=%%N"

rem Sinon, lire le chemin local prepare pour cet ordinateur (exclu de Git).
if not defined CODE_SECRET_NODE if exist "%~dp0.node-local" set /p "CODE_SECRET_NODE="<"%~dp0.node-local"
if not defined CODE_SECRET_NODE goto node_introuvable
if not exist "%CODE_SECRET_NODE%" goto node_introuvable

echo Code secret - gardez cette fenetre ouverte pendant le jeu.
"%CODE_SECRET_NODE%" "%~dp0serveur.mjs"
set "CODE_SECRET_RESULTAT=%ERRORLEVEL%"
if not "%CODE_SECRET_RESULTAT%"=="0" pause
exit /b %CODE_SECRET_RESULTAT%

:node_introuvable
echo Node.js est introuvable sur cet ordinateur.
echo Installez Node.js ou demandez a Codex d'actualiser le chemin local .node-local.
pause
exit /b 1
