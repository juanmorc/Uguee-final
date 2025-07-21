#!/bin/bash
# Script de despliegue en producción para UGUEE

set -e

echo "🚀 Iniciando despliegue de producción de UGUEE"

# Variables de entorno
BACKEND_DIR="/var/www/uguee/backend"
FRONTEND_DIR="/var/www/uguee/frontend"

# 1. Actualizar el código fuente (asumiendo que está en un repositorio git)
echo "📥 Actualizando código fuente..."
cd $BACKEND_DIR
git pull origin main

cd $FRONTEND_DIR
git pull origin main

# 2. Actualizar el backend
echo "🔄 Actualizando backend..."
cd $BACKEND_DIR
source ../venv/bin/activate
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate

# 3. Compilar el frontend
echo "🔄 Compilando frontend..."
cd $FRONTEND_DIR
npm install
npm run build

# 4. Reiniciar los servicios
echo "🔄 Reiniciando servicios..."
sudo systemctl restart gunicorn
sudo systemctl restart nginx

echo "✅ ¡Despliegue completado exitosamente!"
