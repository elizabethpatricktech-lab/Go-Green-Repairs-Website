from django.contrib import admin
from .models import Service, Review

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('user', 'service_type', 'status', 'date', 'price')
    search_fields = ('user__username', 'service_type')
    list_filter = ('status', 'date')
    ordering = ('-date',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'created_at')
    search_fields = ('user__username', 'comment')
    list_filter = ('rating', 'created_at')