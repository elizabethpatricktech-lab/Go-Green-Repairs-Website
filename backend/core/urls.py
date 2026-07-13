from django.urls import path
from . import views

urlpatterns = [
    path("services/", views.get_services),
    path("reviews/", views.get_reviews),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("services/create/", views.create_service, name="create_service"),
]