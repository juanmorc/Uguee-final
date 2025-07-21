# UGUEE - Guía de Despliegue

Este documento describe los pasos para desplegar la aplicación UGUEE tanto en entorno de desarrollo como en producción.

## 📋 Requisitos previos

- Python 3.12 o superior
- Node.js 18 o superior
- npm 9 o superior
- PostgreSQL (para producción)
- Nginx (para producción)

## 🔧 Despliegue en Desarrollo

### Paso 1: Clonar el repositorio

```powershell
git clone <URL_DEL_REPOSITORIO>
cd proyecto-uguee
```

### Paso 2: Configurar el entorno

Simplemente ejecuta el script de configuración de desarrollo:

```powershell
.\dev-deploy.ps1
```

Este script:
1. Crea un entorno virtual de Python
2. Instala las dependencias del backend
3. Aplica las migraciones de la base de datos
4. Instala las dependencias del frontend
5. Crea scripts para iniciar cada servicio

### Paso 3: Iniciar los servicios

En una terminal:

```powershell
.\start_backend.bat
```

En otra terminal:

```powershell
.\start_frontend.bat
```

El frontend estará disponible en: http://localhost:5173
El backend estará disponible en: http://localhost:8000

## 🚀 Despliegue en Producción

### Paso 1: Preparar el servidor

1. Instalar las dependencias necesarias:

```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip nodejs npm nginx postgresql
```

2. Crear directorios para la aplicación:

```bash
sudo mkdir -p /var/www/uguee/{backend,frontend}
sudo chown -R $USER:$USER /var/www/uguee
```

### Paso 2: Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO> /tmp/uguee
cp -r /tmp/uguee/Proyecto/backend/* /var/www/uguee/backend/
cp -r /tmp/uguee/Proyecto/frontend/* /var/www/uguee/frontend/
```

### Paso 3: Configurar el backend

1. Crear y activar un entorno virtual:

```bash
cd /var/www/uguee
python3 -m venv venv
source venv/bin/activate
```

2. Instalar dependencias:

```bash
cd backend
pip install -r /tmp/uguee/requirements.txt
```

3. Configurar variables de entorno:

```bash
cp /tmp/uguee/Proyecto/backend/.env.example .env
# Editar el archivo .env con los valores correctos
nano .env
```

4. Aplicar migraciones:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

### Paso 4: Configurar el frontend

1. Instalar dependencias:

```bash
cd /var/www/uguee/frontend
npm install
```

2. Crear archivo de variables de entorno:

```bash
cp /tmp/uguee/Proyecto/frontend/.env.production .env.production
# Editar si es necesario
nano .env.production
```

3. Compilar:

```bash
npm run build
```

### Paso 5: Configurar Nginx y Gunicorn

1. Configurar Gunicorn como servicio:

```bash
sudo cp /tmp/uguee/gunicorn.service /etc/systemd/system/
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
```

2. Configurar Nginx:

```bash
sudo cp /tmp/uguee/nginx-config.conf /etc/nginx/sites-available/uguee
sudo ln -s /etc/nginx/sites-available/uguee /etc/nginx/sites-enabled
sudo nginx -t  # Verificar configuración
sudo systemctl restart nginx
```

3. Configurar SSL con Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d uguee.example.com
```

### Paso 6: Actualizar la aplicación

Para futuras actualizaciones, use el script de despliegue:

```bash
sudo cp /tmp/uguee/production-deploy.sh /var/www/uguee/
sudo chmod +x /var/www/uguee/production-deploy.sh
cd /var/www/uguee
./production-deploy.sh
```

## 🔍 Solución de problemas

### Problemas con la base de datos
Verificar el estado de PostgreSQL:
```bash
sudo systemctl status postgresql
```

### Problemas con Nginx
Verificar logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Problemas con el backend Django
Verificar logs:
```bash
sudo journalctl -u gunicorn
```
