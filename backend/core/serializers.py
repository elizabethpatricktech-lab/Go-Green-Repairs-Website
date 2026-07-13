from rest_framework import serializers
from .models import Service, Review
from django.contrib.auth.models import User

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "service_type",
            "description",
            "requested_date",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)    

    class Meta:
        model = Review
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [ "first_name", "last_name", "email", "password",]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )
        return user