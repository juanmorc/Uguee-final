from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido a Ugüee Backend API")
