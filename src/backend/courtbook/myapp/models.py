from django.db import models
from django.contrib.auth.models import User


class Locador(models.Model):
    locador = models.ForeignKey(
        User,
        related_name="locadores",
        null=True,
        blank=False,
        on_delete=models.CASCADE,
    )
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Locador"
        verbose_name_plural = "Locadores"

    def __str__(self):
        return f"Locador: {self.locador}"


class Locatario(models.Model):
    locatario = models.ForeignKey(
        User,
        related_name="locatarios",
        null=True,
        blank=False,
        on_delete=models.CASCADE,
    )
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Locatarios"
        verbose_name_plural = "Locatarios"

    def __str__(self):
        return f"Locatario: {self.locatario}"


class Quadra(models.Model):
    nome = models.CharField(max_length=100)
    categorias = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    imagem = models.CharField(max_length=300, default=True)
    localizacao = models.CharField(max_length=200)
    detalhes = models.CharField(max_length=200)
    cidade = models.CharField(max_length=100, default=True)
    ativo = models.BooleanField()
    id_locador = models.ForeignKey(
        Locador,
        related_name="quadras",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Quadra"
        verbose_name_plural = "Quadras"

    def __str__(self):
        return f"Quadra: {self.nome}"


class Reserva(models.Model):
    data_hora = models.DateTimeField()
    data_hora_terminio = models.DateTimeField()
    status = models.CharField(max_length=50, default=True)
    id_quadra = models.ForeignKey(
        Quadra,
        related_name="reservas",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )
    id_locatario = models.ForeignKey(
        Locatario,
        related_name="reservas",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = "Reserva"
        verbose_name_plural = "Reservas"

    def __str__(self):
        return f"Reserva {self.data_hora} as {self.data_hora_terminio}"
