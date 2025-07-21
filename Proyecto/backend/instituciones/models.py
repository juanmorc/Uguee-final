from django.db import models

class Institucion(models.Model):
    instid = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    calle = models.CharField(max_length=100)
    numero = models.CharField(max_length=50)
    logo = models.URLField(max_length=600, blank=True, null=True)  # Guardamos URL pública
    #Acá validamos si la institucion ha sido aprobada por el admin correspondiente
    is_validated   = models.BooleanField(
                        default=False,
                        help_text="¿Ha sido validada/aprobada por un administrador?"
                    )

    def __str__(self):
        return self.nombre

class InsPaleta(models.Model):
    instid = models.ForeignKey(Institucion, on_delete=models.CASCADE)
    color = models.CharField(max_length=50)

    class Meta:
        unique_together = ('instid', 'color')

    def __str__(self):
        return f"{self.instid.nombre} - {self.color}"

