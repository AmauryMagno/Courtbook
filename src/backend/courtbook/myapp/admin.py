from django.contrib import admin
from .models import Locador, Locatario, Reserva, Quadra


@admin.register(Quadra)
class QuadraAdmin(admin.ModelAdmin):
    list_display = {
        "nome",
        "categorias",
        "preco",
        "imagem",
        "localizacao",
        "detalhes",
        "cidade",
        "ativo",
        "locador",
    }


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = {"data_hora"}
