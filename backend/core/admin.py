from django.contrib import admin
from .models import Service, Review
from .emails import EmailService

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

    def save_model(self, request, obj, form, change):
        previous_status = None

        if change:
            previous_status = Service.objects.get(pk=obj.pk).status

        super().save_model(request, obj, form, change)

        if change and previous_status != obj.status:
            EmailService.send_service_status_email(obj)

    actions = [
    "mark_confirmed",
    "mark_in_progress",
    "mark_completed",
    "mark_rejected",
    "send_reminders"
    ]

    @admin.action(description="Mark selected services as Confirmed")
    def mark_confirmed(self, request, queryset):
        updated = 0

        for service in queryset:
            if service.status == "confirmed":
                continue

            service.status = "confirmed"
            service.save()

            EmailService.send_service_status_email(service)

            updated += 1

        self.message_user(
            request,
            f"{updated} service(s) marked as confirmed."
        )


    @admin.action(description="Mark selected services as In Progress")
    def mark_in_progress(self, request, queryset):
        updated = 0

        for service in queryset:
            if service.status == "in_progress":
                continue

            service.status = "in_progress"
            service.save()

            EmailService.send_service_status_email(service)

            updated += 1

        self.message_user(
            request,
            f"{updated} service(s) marked as in progress."
        )


    @admin.action(description="Mark selected services as Completed")
    def mark_completed(self, request, queryset):
        updated = 0

        for service in queryset:
            if service.status == "completed":
                continue

            service.status = "completed"
            service.save()

            EmailService.send_service_status_email(service)

            updated += 1

        self.message_user(
            request,
            f"{updated} service(s) marked as completed."
        )


    @admin.action(description="Mark selected services as Rejected")
    def mark_rejected(self, request, queryset):
        updated = 0

        for service in queryset:
            if service.status == "rejected":
                continue

            service.status = "rejected"
            service.save()

            EmailService.send_service_status_email(service)

            updated += 1

        self.message_user(
            request,
            f"{updated} service(s) marked as rejected."
        )

    @admin.action(description="Send reminder emails")
    def send_reminders(self, request, queryset):

        for service in queryset:
            EmailService.appointment_reminder(service)

        self.message_user(
            request,
            f"{queryset.count()} reminder(s) sent."
        )


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
    "requested_time_window",
    "assigned_time_window",
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
    list_display = (
        "user",
        "service",
        "rating",
        "comment",
        "is_approved",
    )

    list_filter = (
        "is_approved",
        "rating",
    )

    search_fields = (
        "user__username",
        "comment",
    )

    @admin.action(description="Approve selected reviews")
    def approve_reviews(modeladmin, request, queryset):
        queryset.update(is_approved=True)

    @admin.action(description="Reject selected reviews")
    def reject_reviews(modeladmin, request, queryset):
        queryset.update(is_approved=False)

    actions = [approve_reviews, reject_reviews]