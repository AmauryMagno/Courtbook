from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Locador, Locatario, Quadra, Reserva


class LocadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locador
        fields = ["ativo"]


class LocatarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locatario
        fields = ["ativo"]


class UserSerializer(serializers.ModelSerializer):
    locador = LocadorSerializer(required=False)
    locatario = LocatarioSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "password",
            "locador",
            "locatario",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        locador_data = validated_data.pop("locador", None)
        locatario_data = validated_data.pop("locatario", None)

        user = User.objects.create_user(
            username=validated_data["username"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            password=validated_data["password"],
        )

        if locador_data:
            Locador.objects.create(locador=user, ativo=locador_data["ativo"])

        if locatario_data:
            Locatario.objects.create(locatario=user, ativo=locatario_data["ativo"])

        return user


class QuadraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quadra
        fields = "__all__"


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = "__all__"
