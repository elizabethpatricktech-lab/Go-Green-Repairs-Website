from django.shortcuts import render
from rest_framework.response import Response
from .models import Service, Review, CustomerProfile
from .serializers import ServiceSerializer, ReviewSerializer, RegisterSerializer, ServiceRequestSerializer, CustomerProfileSerializer
from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.views import APIView
from .emails import EmailService


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
def get_service(request, id):
    service = get_object_or_404(
        Service,
        id=id,
        user=request.user,
    )

    serializer = ServiceSerializer(service)

    return Response(serializer.data)
    
@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    profile = CustomerProfile.objects.get(user=request.user)

    if request.method == "GET":
        serializer = CustomerProfileSerializer(profile)
        return Response(serializer.data)

    serializer = CustomerProfileSerializer(
        profile,
        data=request.data,
        partial=True,
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        EmailService.verify_email(user)


class ForgotPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)

            EmailService.password_reset(user)

        except User.DoesNotExist:
            pass

        return Response(
            {
                "message": (
                    "If an account with that email exists, "
                    "a password reset email has been sent."
                )
            },
            status=status.HTTP_200_OK,
        )

class ResetPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        password = request.data.get("password")

        print("UID:", uid)
        print("TOKEN:", token)
        print("PASSWORD:", password)

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            print("USER ID:", user_id)
           
            user = User.objects.get(pk=user_id)
            print("USER:", user)
            print("TOKEN VALID:", default_token_generator.check_token(user, token))


        except Exception as e:
            print("ERROR:", repr(e))
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"message": "Reset link has expired or is invalid."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(password)
        user.save()

        return Response(
            {"message": "Password reset successfully."},
            status=status.HTTP_200_OK,
        )

class VerifyEmailView(APIView):
    permission_classes = []

    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)

        except Exception:
            return Response(
                {"message": "Invalid verification link."},
                status=400,
            )

        if user.profile.is_verified:
            return Response(
                {"message": "Email has already been verified."},
                status=200,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"message": "Verification link is invalid."},
                status=400,
            )

        user.profile.is_verified = True
        user.profile.save()

        return Response({
            "message": "Email verified successfully."
        })