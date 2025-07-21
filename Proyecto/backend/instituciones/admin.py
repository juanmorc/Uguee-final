from django.contrib import admin
from django.utils.html import format_html
from .models import Institucion, InsPaleta

@admin.register(Institucion)
class InstitucionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'logo_thumbnail')

    def logo_thumbnail(self, obj):
        if obj.logo:
            # No usar obj.logo.url porque logo es string con la URL
            return format_html('<img src="{}" style="width: 50px; height: auto;" />', obj.logo)
        return "-"
    logo_thumbnail.short_description = 'Logo'

admin.site.register(InsPaleta)

