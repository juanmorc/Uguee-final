from django.db import models
from usuarios.models import Usuario

class Vehiculo(models.Model):
    placa = models.CharField(max_length=20, primary_key=True)
    modelo = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    categoria = models.CharField(max_length=100)
    tecnomecanica = models.DateField()
    soat = models.DateField()
    marca = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    uid = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False, help_text="¿Vehículo aprobado por la institución?")

    def __str__(self):
        return self.placa
