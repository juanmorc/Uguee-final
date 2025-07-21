from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet, UsuarioTypeViewSet, DocumentoViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'usertypes', UsuarioTypeViewSet)
router.register(r'documentos', DocumentoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
