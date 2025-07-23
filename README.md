

# UGUEE - Sistema de Gestión de Transporte Universitario

![GitHub repo](https://img.shields.io/github/repo-size/juanmorc/Uguee-final?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/juanmorc/Uguee-final?style=flat-square)
![GitHub license](https://img.shields.io/github/license/juanmorc/Uguee-final?style=flat-square)

Plataforma web para la gestión de usuarios, vehículos, viajes e instituciones en el transporte universitario. Incluye backend en Django y frontend en React/TypeScript.

Repositorio: [https://github.com/juanmorc/Uguee-final](https://github.com/juanmorc/Uguee-final)

---

## Tabla de Contenido
- [Requisitos previos](#requisitos-previos)
- [Despliegue en Windows 10 o superior](#despliegue-en-windows-10-o-superior)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Solución de Problemas](#solución-de-problemas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## 📋 Requisitos previos

- Windows 10 o superior
- Python 3.12 o superior ([Descargar](https://www.python.org/downloads/))
- Node.js 18 o superior ([Descargar](https://nodejs.org/))
- npm 9 o superior (incluido con Node.js)

---

## 🔧 Despliegue en Windows 10 o superior

1. **Clona el repositorio:**
   ```powershell
   git clone https://github.com/juanmorc/Uguee-final.git
   cd Uguee-final
   ```

2. **Configura el entorno automáticamente:**
   ```powershell
   .\dev-deploy.ps1
   ```
   Este script:
   - Crea un entorno virtual de Python (en la raíz del proyecto)
   - Instala dependencias del backend y frontend
   - Aplica migraciones
   - Prepara scripts para iniciar ambos servicios

3. **Inicia los servicios:**
   - Abre una terminal (PowerShell o CMD) y ejecuta:
     ```powershell
     .\start_backend.bat
     ```
   - Abre otra terminal y ejecuta:
     ```powershell
     .\start_frontend.bat
     ```

4. **Accede a la aplicación:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8000](http://localhost:8000)

**Notas para Windows:**
- Si ves advertencias de permisos, ejecuta PowerShell como administrador.
- Si tienes problemas con la activación del entorno virtual, revisa la política de ejecución con:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- Si necesitas instalar Python o Node.js, descárgalos desde los enlaces de requisitos previos.

---

## Variables de Entorno
- Copia `.env.example` a `.env` y completa los valores necesarios en `Proyecto/backend`.
- Copia `.env.production` a `.env.production` en `Proyecto/frontend` y edita si es necesario.
- **Nunca subas tu archivo `.env` real al repositorio.**

---

## Estructura del Proyecto
```
Uguee-final/
├── Proyecto/
│   ├── backend/         # Backend Django
│   └── frontend/        # Frontend React
├── requirements.txt     # Dependencias Python
├── dev-deploy.ps1       # Script de despliegue local (Windows)
├── production-deploy.sh # Script de despliegue producción (Linux, solo referencia)
├── nginx-config.conf    # Configuración Nginx ejemplo (solo referencia)
├── gunicorn.service     # Configuración Gunicorn ejemplo (solo referencia)
└── README.md            # Guía de despliegue
```

---

## 🔍 Solución de Problemas

- Si tienes problemas con dependencias de Python, asegúrate de tener el entorno virtual activado.
- Si el puerto 8000 o 5173 está ocupado, ciérralo o usa otro puerto en los scripts.
- Si ves errores de permisos, ejecuta la terminal como administrador.
- Si tienes problemas con la base de datos SQLite, elimina el archivo `db.sqlite3` en `Proyecto/backend` y ejecuta de nuevo las migraciones.

---

## Contribuir
1. Haz un fork del repositorio
2. Crea una rama para tu feature/fix
3. Haz tus cambios y abre un Pull Request

## Licencia
MIT

---

**Contacto:** [juanmorc](https://github.com/juanmorc)

---

## 🔍 Solución de Problemas

### Base de datos
Verifica el estado de PostgreSQL:
```bash
sudo systemctl status postgresql
```

### Nginx
Verifica logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Backend Django
Verifica logs:
```bash
sudo journalctl -u gunicorn
```

---
