from rest_framework import viewsets
from .models import Viaje, PasajeroViaje
from .serializers import ViajeSerializer, PasajeroViajeSerializer

class ViajeViewSet(viewsets.ModelViewSet):
    queryset = Viaje.objects.all()
    serializer_class = ViajeSerializer

class PasajeroViajeViewSet(viewsets.ModelViewSet):
    queryset = PasajeroViaje.objects.all()
    serializer_class = PasajeroViajeSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            # Solo admin puede cambiar estado (y puntuación/comentario si quieres)
            return [permissions.IsAdminUser()]
        elif self.action in ['create', 'list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return super().get_permissions()
