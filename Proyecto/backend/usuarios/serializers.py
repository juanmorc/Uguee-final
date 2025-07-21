from rest_framework import serializers
from .models import Usuario, UsuarioType, Documento
from supabase import create_client
from instituciones.models import Institucion
import os

# Carga variables de entorno para Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class UsuarioSerializer(serializers.ModelSerializer):
    direccion = serializers.CharField(write_only=True, required=False)
    telefono = serializers.CharField(write_only=True, required=False)
    id_estudiantil = serializers.CharField(write_only=True, required=False)
    rol = serializers.CharField(write_only=True, required=False)
    contrasena = serializers.CharField(write_only=True, required=True)  # Campo del frontend
    
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'calle': {'required': False},
            'numero': {'required': False},
            'celular': {'required': False},
            'codigo': {'required': False},
            'instid': {'required': False},
            'contraseña': {'write_only': True, 'required': False}
        }
    
    def create(self, validated_data):
        print("Datos recibidos en el serializador:", validated_data)  # Debug
        
        # Manejar campos que tienen nombres diferentes
        direccion = validated_data.pop('direccion', '')
        telefono = validated_data.pop('telefono', '')
        id_estudiantil = validated_data.pop('id_estudiantil', '')
        rol = validated_data.pop('rol', 'Pasajero')
        contrasena = validated_data.pop('contrasena', '')  # Campo del frontend
        
        print(f"Campos extraídos - direccion: {direccion}, telefono: {telefono}, id_estudiantil: {id_estudiantil}, rol: {rol}")  # Debug
        
        # Asignar valores a los campos del modelo
        validated_data['calle'] = direccion
        validated_data['numero'] = '0'  # Valor por defecto
        validated_data['celular'] = int(telefono) if telefono and telefono.isdigit() else 0
        validated_data['codigo'] = id_estudiantil
        validated_data['contraseña'] = contrasena  # Usar el nombre correcto del modelo
        
        # Asignar una institución por defecto (primera institución)
        # Esto es temporal, debería seleccionarse en base al correo o ID estudiantil
        try:
            institucion = Institucion.objects.first()
            if not institucion:
                raise serializers.ValidationError("No hay instituciones registradas en el sistema")
            validated_data['instid'] = institucion
            print(f"Institución asignada: {institucion.nombre}")  # Debug
        except Exception as e:
            print(f"Error al asignar institución: {e}")  # Debug
            raise serializers.ValidationError(f"Error al asignar institución: {str(e)}")
        
        print("Datos finales para crear usuario:", validated_data)  # Debug
        
        try:
            # Crear el usuario
            usuario = Usuario.objects.create(**validated_data)
            print(f"Usuario creado con ID: {usuario.uid}")  # Debug
            
            # Crear el tipo de usuario
            usuario_type = UsuarioType.objects.create(uid=usuario, tipo=rol)
            print(f"Tipo de usuario creado: {usuario_type.tipo}")  # Debug
            
            return usuario
        except Exception as e:
            print(f"Error al crear usuario: {e}")  # Debug
            raise serializers.ValidationError(f"Error al crear usuario: {str(e)}")

class UsuarioTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioType
        fields = '__all__'

class DocumentoSerializer(serializers.ModelSerializer):
    archivo = serializers.FileField(write_only=True, required=True)  # Para recibir el archivo

    class Meta:
        model = Documento
        fields = ['uid', 'tipo', 'url', 'archivo']
        read_only_fields = ['url']

    def create(self, validated_data):
        archivo = validated_data.pop('archivo')

        # Genera una ruta única para el archivo
        path = f"documentos/{archivo.name}"

        # Sube el archivo a Supabase Storage
        response = supabase.storage.from_('documentos').upload(path, archivo)
        if response.get('error'):
            raise serializers.ValidationError("Error al subir archivo a Supabase Storage")

        # Obtiene la URL pública del archivo subido
        public_url = supabase.storage.from_('documentos').get_public_url(path)['publicURL']

        validated_data['url'] = public_url

        return super().create(validated_data)

