from rest_framework import viewsets, permissions
from .models import Vehiculo
from .serializers import VehiculoSerializer

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        elif self.action in ['create']:
            return [permissions.IsAuthenticated()]  # Solo usuarios autenticados pueden registrar vehículo
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Vehiculo.objects.all()
        return Vehiculo.objects.filter(is_approved=True)
