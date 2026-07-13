from django.contrib import admin
from .models import Service, Review

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('user', 'service_type', 'status', 'requested_date', 'price')
    search_fields = ('user__username', 'service_type')
    list_filter = ('status', 'requested_date')
    ordering = ('-requested_date',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'created_at')
    search_fields = ('user__username', 'comment')
    list_filter = ('rating', 'created_at')