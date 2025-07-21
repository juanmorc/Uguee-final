from django.contrib import admin
from django.utils.html import format_html
from .models import Usuario, UsuarioType, Documento

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'correo', 'celular', 'instid', 'is_approved')
    list_editable = ('is_approved',)

@admin.register(UsuarioType)
class UsuarioTypeAdmin(admin.ModelAdmin):
    list_display = ('uid', 'tipo')

@admin.register(Documento)
class DocumentoAdmin(admin.ModelAdmin):
    list_display = ('uid', 'tipo', 'archivo_link')

    def archivo_link(self, obj):
        if obj.url:
            # obj.url is a string URL, no .url attribute
            url = obj.url
            if url.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                return format_html('<img src="{}" style="width: 50px; height: auto;" />', url)
            else:
                return format_html('<a href="{}" target="_blank">Ver archivo</a>', url)
        return "-"
    archivo_link.short_description = 'Archivo'

