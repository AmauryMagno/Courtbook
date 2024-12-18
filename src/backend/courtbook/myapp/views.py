from django.shortcuts import redirect
from rest_framework import serializers, status, generics
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import Quadra, Locatario, Reserva, Locador
from .serializers import (
    UserSerializer,
    ReservaSerializer,
    QuadraSerializer,
)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
        )
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_200_OK)

        except serializers.ValidationError as e:
            return Response(
                {"error": f"Usuário ou senha inválidos: {e}"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            return Response(
                {"error": f"Erro inesperado: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class QuadraViewListCreate(generics.ListCreateAPIView):
    queryset = Quadra.objects.all()
    serializer_class = QuadraSerializer


class ReservaViewListCreate(generics.ListCreateAPIView):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer


class UserCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HomeView(generics.ListAPIView):
    try:
        permission_classes = [IsAuthenticated]
        serializer_class = None

        def list(self, request, *args, **kwargs):
            user = self.request.user
            locatario = user.locatario.filter(ativo=True).first()

            if locatario:

                reservas = Reserva.objects.filter(locatario=locatario)
                quadras = Quadra.objects.all()[:5]

                quadra_serializer = QuadraSerializer(reservas, many=True)
                reserva_serializer = ReservaSerializer(quadras, many=True)

                return Response(
                    {
                        "Reserva": reserva_serializer.data,
                        "Quadras": quadra_serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )

    except Exception as e:
        Response(
            {"error": f"Erro na consulta de reservas e quadras: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
