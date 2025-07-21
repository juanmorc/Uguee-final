from instituciones.models import Institucion

# Crear institución por defecto si no existe
if not Institucion.objects.exists():
    institucion = Institucion.objects.create(
        nombre="Universidad por Defecto",
        calle="Calle Principal", 
        numero="123"
    )
    print(f"Institución creada: {institucion.nombre}")
else:
    print("Ya existe una institución")
    
# Mostrar instituciones existentes
print("Instituciones disponibles:")
for inst in Institucion.objects.all():
    print(f"- {inst.nombre} (ID: {inst.instid})")
