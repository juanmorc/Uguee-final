# instituciones/views.py
#acá se ajusto para que oculte las insti no validadas y controlar permisos ssgun el admin
from rest_framework import viewsets, permissions
from .models import Institucion, InsPaleta
from .serializers import InstitucionSerializer, InsPaletaSerializer

class InstitucionViewSet(viewsets.ModelViewSet):
    queryset         = Institucion.objects.all()      # <— aquí
    serializer_class = InstitucionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Institucion.objects.all()
        return Institucion.objects.filter(is_validated=True)

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

class InsPaletaViewSet(viewsets.ModelViewSet):
    queryset         = InsPaleta.objects.all()
    serializer_class = InsPaletaSerializer
    permission_classes = [permissions.IsAdminUser]





