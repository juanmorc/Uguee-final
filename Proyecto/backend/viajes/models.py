from django.db import models
from vehiculos.models import Vehiculo
from usuarios.models import Usuario

class Viaje(models.Model):
    vid = models.AutoField(primary_key=True)
    salida = models.TimeField()
    partida = models.CharField(max_length=150)
    ruta = models.TextField()
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)

    def __str__(self):
        return f"Viaje {self.vid} - {self.partida}"

class PasajeroViaje(models.Model):
    uid = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    vid = models.ForeignKey(Viaje, on_delete=models.CASCADE)
    puntuacion = models.IntegerField(blank=True, null=True)
    comentario = models.TextField(blank=True, null=True)

    # Nuevo campo para control de estado
    estado = models.CharField(
        max_length=20,
        choices=[
            ('pendiente', 'Pendiente'),
            ('aceptado', 'Aceptado'),
            ('rechazado', 'Rechazado'),
        ],
        default='pendiente',
        help_text="Estado de la aceptación del pasajero para el viaje"
    )

    class Meta:
        unique_together = ('uid', 'vid')

    def __str__(self):
        return f"Usuario {self.uid.uid} - Viaje {self.vid.vid} ({self.estado})"
