from django.urls import path
from .views import (
    LoginView,
    HomeView,
    QuadraViewListCreate,
    ReservaViewListCreate,
    UserCreate,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("cadastro/", UserCreate.as_view(), name="cadastro"),
    path("home/", HomeView.as_view(), name="login"),
    path("quadra/", QuadraViewListCreate.as_view(), name="quadra_list_create"),
    path("reserva/", ReservaViewListCreate.as_view(), name="reserva_list_create"),
]
