from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import InstitucionViewSet, InsPaletaViewSet

router = DefaultRouter()
router.register(r'instituciones', InstitucionViewSet)
router.register(r'ins-paleta', InsPaletaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

