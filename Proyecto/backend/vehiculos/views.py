from rest_framework import viewsets, permissions
from .models import Vehiculo
from .serializers import VehiculoSerializer
from rest_framework.permissions import AllowAny
from rest_framework import permissions

class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer
    authentication_classes = [] 
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        elif self.action in ['create']:
            return [permissions.AllowAny()]  # Permitir cualquier usuario para registrar vehículo
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Vehiculo.objects.all()
        return Vehiculo.objects.filter(is_approved=True)
