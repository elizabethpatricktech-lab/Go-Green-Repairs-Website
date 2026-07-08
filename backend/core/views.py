from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service, Review
from .serializers import ServiceSerializer, ReviewSerializer


@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
