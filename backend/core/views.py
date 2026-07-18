from django.shortcuts import render
from rest_framework.response import Response
from .models import Service, Review, CustomerProfile
from .serializers import ServiceSerializer, ReviewSerializer, RegisterSerializer, ServiceRequestSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from .serializers import CustomerProfileSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_services(request):
    services = Service.objects.filter(user=request.user).order_by("-requested_date")
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_service(request):
    serializer = ServiceRequestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(
            user=request.user,
            status="pending"
        )

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    profile = CustomerProfile.objects.get(user=request.user)
    serializer = CustomerProfileSerializer(profile)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user

    return Response({
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
    })

@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
