from django.contrib import admin
from .models import Vehiculo

@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ('placa', 'marca', 'modelo', 'color', 'uid', 'is_approved')
    list_filter = ('marca', 'categoria', 'tipo', 'is_approved')
    search_fields = ('placa', 'marca', 'modelo')
    list_editable = ('is_approved',)
    ordering = ('placa',)
