from rest_framework import serializers
from .models import Service, Review

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)    

    class Meta:
        model = Review
        fields = '__all__'