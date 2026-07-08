from django.urls import path
from .views import get_services, get_reviews

urlpatterns = [
    path('services/', get_services),
    path('reviews/', get_reviews),
]