from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ViajeViewSet, PasajeroViajeViewSet

router = DefaultRouter()
router.register(r'viajes', ViajeViewSet)
router.register(r'pasajeroviajes', PasajeroViajeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
