from rest_framework import serializers
from .models import Institucion, InsPaleta
from supabase import create_client
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

class InstitucionSerializer(serializers.ModelSerializer):
    logo_file = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = Institucion
        fields = ['instid', 'nombre', 'calle', 'numero', 'logo', 'logo_file']
        read_only_fields = ['logo']

    def _upload_logo(self, logo_file):
        extension = os.path.splitext(logo_file.name)[1]
        unique_name = f"{uuid.uuid4().hex}{extension}"
        path = f"logos/{unique_name}"

        file_bytes = logo_file.read()

        response = supabase.storage.from_('logos').upload(path, file_bytes)
        if hasattr(response, "error") and response.error:
            raise serializers.ValidationError(f"Error al subir logo a Supabase: {response.error}")

        public_url = supabase.storage.from_('logos').get_public_url(path)
        if not public_url:
            raise serializers.ValidationError("No se pudo obtener la URL pública del logo.")

        return public_url

    def create(self, validated_data):
        logo_file = validated_data.pop('logo_file', None)
        if logo_file:
            validated_data['logo'] = self._upload_logo(logo_file)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        logo_file = validated_data.pop('logo_file', None)
        if logo_file:
            validated_data['logo'] = self._upload_logo(logo_file)
        return super().update(instance, validated_data)

class InsPaletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsPaleta
        fields = '__all__'





