from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

STATUS_EMAILS = {
    "pending": {
        "subject": "We've received your service request",
        "message": (
            "We've received your request and our team "
            "will review it shortly."
        ),
        "show_requested": True,
        "show_scheduled": False,
    },

    "confirmed": {
        "subject": "Your service request has been confirmed",
        "message": (
            "Great news! Your request has been confirmed. "
            "We'll contact you soon with scheduling information."
        ),
        "show_requested": True,
        "show_scheduled": True,
    },

    "assessed": {
        "subject": "Your service has been assessed",
        "message": (
            "We've completed the assessment and "
            "will update you with pricing soon."
        ),
        "show_requested": False,
        "show_scheduled": True,
    },

    "in_progress": {
        "subject": "Your service is now in progress",
        "message": (
            "Our technicians have started working on your service."
        ),
        "show_requested": False,
        "show_scheduled": True,
    },

    "completed": {
        "subject": "Your service has been completed",
        "message": (
            "Your service has been completed successfully. "
            "Thank you for choosing Go Green Repairs!"
        ),
        "show_requested": False,
        "show_scheduled": True,
    },

    "rejected": {
        "subject": "Update regarding your service request",
        "message": (
            "Unfortunately we're unable to complete your request. "
            "Please contact us if you'd like to discuss it."
        ),
        "show_requested": True,
        "show_scheduled": False,
    },

    "rescheduled": {
        "subject": "Your appointment has been rescheduled",
        "message": (
            "Your appointment has been rescheduled. "
            "Please see the updated appointment details below."
        ),
        "show_requested": True,
        "show_scheduled": True,
    },
}



class EmailService:

    @staticmethod
    def send_template(
        subject,
        template,
        context,
        recipient,
    ):

        html = render_to_string(
            template,
            context,
        )

        email = EmailMultiAlternatives(
            subject,
            "",
            settings.DEFAULT_FROM_EMAIL,
            [recipient],
        )

        email.attach_alternative(
            html,
            "text/html",
        )

        email.send()

        print(f"EMAIL SENT TO {recipient}")

    @staticmethod
    def send_service_status_email(service):

        config = STATUS_EMAILS.get(service.status)

        if not config:
            return

        EmailService.send_template(
            subject=config["subject"],
            template="emails/service_status.html",
            recipient=service.user.email,
            context={
                "subject": config["subject"],
                "message": config["message"],
                "first_name": (
                    service.user.first_name or service.user.username
                ),
                "service": service,

                "show_requested": config["show_requested"],
                "show_scheduled": config["show_scheduled"],
            },
        )

    @staticmethod
    def password_reset(user):
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.encoding import force_bytes
        from django.utils.http import urlsafe_base64_encode

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = (
            f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        )

        EmailService.send_template(
            subject="Reset your Go Green Repairs password",
            template="emails/password_reset.html",
            recipient=user.email,
            context={
                "first_name": user.first_name or user.username,
                "reset_link": reset_link,
            },
        )

    @staticmethod
    def verify_email(user):
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.encoding import force_bytes
        from django.utils.http import urlsafe_base64_encode

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        verification_link = (
            f"{settings.FRONTEND_URL}/verify-email/{uid}/{token}"
        )

        EmailService.send_template(
            subject="Verify your Go Green Repairs account",
            template="emails/email_verification.html",
            recipient=user.email,
            context={
                "first_name": user.first_name or user.username,
                "verification_link": verification_link,
            },
        )

    @staticmethod
    def welcome_email(user):
        EmailService.send_template(
            subject="Welcome to Go Green Repairs!",
            template="emails/welcome.html",
            recipient=user.email,
            context={
                "first_name": user.first_name or user.username,
                "dashboard_link": f"{settings.FRONTEND_URL}/profile",
            },
    )

    @staticmethod
    def new_service_request(service):
        EmailService.send_template(
            subject="🔔 New Service Request",
            template="emails/admin_new_service.html",
            recipient=settings.ADMIN_EMAIL,
            context={
                "service": service,
            },
        )

    @staticmethod
    def appointment_reminder(service):
        EmailService.send_template(
            subject="Appointment Reminder",
            template="emails/appointment_reminder.html",
            recipient=service.user.email,
            context={
                "first_name": (
                    service.user.first_name or service.user.username
                ),
                "service": service,
            },
        )