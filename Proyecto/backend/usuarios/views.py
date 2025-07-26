from rest_framework import viewsets
from .models import Usuario, UsuarioType, Documento
from .serializers import UsuarioSerializer, UsuarioTypeSerializer, DocumentoSerializer
from rest_framework.permissions import AllowAny  # o IsAuthenticated según lo que quieras
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework import authentication

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        """Permite registro sin autenticación"""
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]
    
    def get_authenticators(self):
        """Override authentication for registration"""
        # Verificar si es una request POST a la URL de usuarios
        if (self.request.method == 'POST' and 
            '/usuarios/' in self.request.path):
            return []  # Sin autenticación para registro
        return super().get_authenticators()

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

