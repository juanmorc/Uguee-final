"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "Bienvenido a la API de UGUEE",
        "version": "1.0",
        "endpoints": {
            "usuarios": "/usuarios/",
            "instituciones": "/instituciones/",
            "vehiculos": "/vehiculos/",
            "viajes": "/viajes/"
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('instituciones/', include('instituciones.urls')),
    path('uguee/', include('uguee.urls')),  
    path('usuarios/', include('usuarios.urls')),
    path('vehiculos/', include('vehiculos.urls')),
    path('viajes/', include('viajes.urls')),
]