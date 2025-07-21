from rest_framework import viewsets
from .models import Usuario, UsuarioType, Documento
from .serializers import UsuarioSerializer, UsuarioTypeSerializer, DocumentoSerializer
from rest_framework.permissions import AllowAny  # o IsAuthenticated según lo que quieras
from rest_framework import permissions

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        elif self.action in ['create']:
            return [permissions.AllowAny()]  # Registro libre
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Usuario.objects.all()
        return Usuario.objects.filter(is_approved=True)

class UsuarioTypeViewSet(viewsets.ModelViewSet):
    queryset = UsuarioType.objects.all()
    serializer_class = UsuarioTypeSerializer
    permission_classes = [AllowAny]

class DocumentoViewSet(viewsets.ModelViewSet):
    queryset = Documento.objects.all()
    serializer_class = DocumentoSerializer
    permission_classes = [AllowAny]

