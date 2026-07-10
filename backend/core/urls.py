from django.urls import path
from .views import get_services, get_reviews, RegisterView

urlpatterns = [
    path('services/', get_services),
    path('reviews/', get_reviews),
    path("register/", RegisterView.as_view(), name="register"),
]