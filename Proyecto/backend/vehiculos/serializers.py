from rest_framework import serializers
from .models import Vehiculo
from usuarios.models import Usuario
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

# Configurar Supabase solo si las variables existen
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Supabase configurado correctamente")
    except Exception as e:
        print(f"Error configurando Supabase: {e}")

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'

    def validate(self, data):
        print("=== SERIALIZER VALIDATE ===")
        print("Raw data recibida:", data)
        print("Tipos de datos:")
        for key, value in data.items():
            print(f"  {key}: {value} (tipo: {type(value)})")
        
        return data

    def create(self, validated_data):
        print("=== CREANDO VEHÍCULO ===")
        print("Validated data:", validated_data)
        
        try:
            # 1. Crear en Django primero
            vehiculo = Vehiculo.objects.create(**validated_data)
            print(f"✅ Vehículo creado en Django: {vehiculo.placa}")
            
            # 2. Intentar guardar en Supabase
            if supabase:
                try:
                    # Debugging: verificar el objeto usuario
                    print(f"Usuario object: {vehiculo.uid}")
                    print(f"Atributos del usuario: {dir(vehiculo.uid)}")
                    
                    # Obtener el ID del usuario correctamente
                    user_id = None
                    if hasattr(vehiculo.uid, 'id'):
                        user_id = vehiculo.uid.id
                    elif hasattr(vehiculo.uid, 'uid'):
                        user_id = vehiculo.uid.uid
                    elif hasattr(vehiculo.uid, 'pk'):
                        user_id = vehiculo.uid.pk
                    else:
                        print("❌ No se puede obtener ID del usuario")
                        raise Exception("No se puede obtener ID del usuario")
                    
                    print(f"User ID obtenido: {user_id}")
                    
                    # Preparar datos para Supabase
                    supabase_data = {
                        'placa': str(vehiculo.placa),
                        'modelo': str(vehiculo.modelo),
                        'color': str(vehiculo.color),
                        'categoria': str(vehiculo.categoria) if vehiculo.categoria else 'Local',
                        'tecnomecanica': str(vehiculo.tecnomecanica),
                        'soat': str(vehiculo.soat),
                        'marca': str(vehiculo.marca),
                        'tipo': str(vehiculo.tipo) if vehiculo.tipo else 'Sedan',
                        'uid_id': int(user_id),  # Usar la variable user_id
                        'is_approved': bool(vehiculo.is_approved)
                    }
                    
                    print("Datos para Supabase:", supabase_data)
                    
                    # Insertar en Supabase
                    response = supabase.table('vehiculos_vehiculo').insert(supabase_data).execute()
                    
                    if response.data:
                        print("✅ Vehículo guardado en Supabase:", response.data)
                    else:
                        print("⚠️ Respuesta vacía de Supabase:", response)
                        
                except Exception as supabase_error:
                    print(f"❌ Error en Supabase: {supabase_error}")
                    print(f"Tipo de error Supabase: {type(supabase_error)}")
                    # No lanzar error aquí porque Django ya funcionó
            else:
                print("⚠️ Supabase no está configurado")
            
            return vehiculo
            
        except Exception as django_error:
            print(f"❌ Error crítico en Django: {django_error}")
            raise serializers.ValidationError(f"Error al crear vehículo: {str(django_error)}")