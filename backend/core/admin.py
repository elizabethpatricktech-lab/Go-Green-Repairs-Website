from django.contrib import admin
from .models import Service, Review

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    @admin.display(description="Customer")
    def customer_name(self, obj):
        full_name = f"{obj.user.first_name} {obj.user.last_name}".strip()

        if full_name:
            return full_name

        return obj.user.email


    @admin.display(description="Phone")
    def customer_phone(self, obj):
        if hasattr(obj.user, "profile"):
            return obj.user.profile.phone or "—"

        return "—"

    @admin.display(description="City")
    def customer_city(self, obj):
        if hasattr(obj.user, "profile"):
            return obj.user.profile.city or "—"

        return "—"


    list_display = (
    "id",
    "customer_name",
    "customer_phone",
    "customer_city",

    "service_type",
    "status",
    "requested_date",
    "scheduled_date",
    "price",
)
    search_fields = (
    "user__first_name",
    "user__last_name",
    "user__email",
    "description",
)
    list_filter = (
    "status",
    "service_type",
    "scheduled_date",
)
    ordering = ("-created_at",)

    list_per_page = 25
    date_hierarchy = "created_at"


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'created_at')
    search_fields = ('user__username', 'comment')
    list_filter = ('rating', 'created_at')