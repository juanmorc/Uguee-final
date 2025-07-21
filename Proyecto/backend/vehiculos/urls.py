from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import VehiculoViewSet

router = DefaultRouter()
router.register(r'vehiculos', VehiculoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
