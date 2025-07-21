$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando despliegue de desarrollo de UGUEE" -ForegroundColor Green

# Configurar el entorno virtual Python y el backend
Write-Host "🐍 Configurando entorno Python..." -ForegroundColor Yellow
if (-not (Test-Path ".\venv")) {
    Write-Host "Creando entorno virtual..." -ForegroundColor Cyan
    python -m venv venv
}

Write-Host "Activando entorno virtual..." -ForegroundColor Cyan
.\venv\Scripts\Activate

Write-Host "Instalando dependencias del backend..." -ForegroundColor Cyan
pip install -r requirements.txt

Write-Host "Migrando base de datos..." -ForegroundColor Cyan
cd Proyecto\backend
python manage.py migrate
cd ..\..\

# Configurar el frontend
Write-Host "🌐 Configurando frontend..." -ForegroundColor Yellow
cd Proyecto\frontend
Write-Host "Instalando dependencias del frontend..." -ForegroundColor Cyan
npm install

# Iniciar ambos servicios (necesita dos ventanas de PowerShell)
Write-Host "🚀 Iniciando servicios..." -ForegroundColor Green

# Crear archivo batch temporal para iniciar el backend
$backendScript = @"
cd $PWD\..\backend
..\..\..\venv\Scripts\Activate
python manage.py runserver
"@

$frontendScript = @"
cd $PWD
npm run dev
"@

Set-Content -Path "start_backend.bat" -Value $backendScript
Set-Content -Path "start_frontend.bat" -Value $frontendScript

Write-Host "✅ Listo para iniciar servicios:" -ForegroundColor Green
Write-Host "   1. Inicia el backend ejecutando: .\start_backend.bat" -ForegroundColor White
Write-Host "   2. En una nueva terminal, inicia el frontend ejecutando: .\start_frontend.bat" -ForegroundColor White
