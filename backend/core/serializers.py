from rest_framework import serializers
from .models import Service, Review, CustomerProfile
from django.contrib.auth.models import User

class ServiceSerializer(serializers.ModelSerializer):
    service_type_display = serializers.CharField(
        source="get_service_type_display",
        read_only=True
    )

    status_display = serializers.CharField(
        source="get_status_display",
        read_only=True
    )
    
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

class CustomerProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = CustomerProfile
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "zip_code",
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        instance.user.first_name = user_data.get(
            "first_name",
            instance.user.first_name,
        )

        instance.user.last_name = user_data.get(
            "last_name",
            instance.user.last_name,
        )

        instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance