from django.conf import settings
from django.core.mail import send_mail


class EmailService:
    @staticmethod
    def send(subject, message, recipient):
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [recipient],
        )

        print(f"EMAIL SENT TO {recipient}")

    @staticmethod
    def send_service_status_email(service):
        handlers = {
            "pending": EmailService.service_received,
            "confirmed": EmailService.service_confirmed,
            "assessed": EmailService.service_assessed,
            "in_progress": EmailService.service_in_progress,
            "completed": EmailService.service_completed,
            "rejected": EmailService.service_rejected,
            "rescheduled": EmailService.service_rescheduled,
        }

        handler = handlers.get(service.status)

        if handler:
            handler(service)

    @staticmethod
    def service_received(service):
        EmailService.send(
            subject="We've received your service request",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Thank you for contacting Go Green Repairs!

            We've received your request for:

            {service.get_service_type_display()}

            Our team will review it shortly and update you as soon as possible.

            Thank you,
            Go Green Repairs
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_confirmed(service):
        EmailService.send(
            subject="Your service request has been confirmed",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Great news!

            Your request for:

            {service.get_service_type_display()}

            has been confirmed.

            We'll contact you soon with scheduling information.

            Thank you for choosing Go Green Repairs!
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_assessed(service):
        EmailService.send(
            subject="Your service has been assessed",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            We've completed the on-site assessment for your:

            {service.get_service_type_display()}.

            We'll update you with pricing and the next steps as soon as possible.

            Thank you,
            Go Green Repairs
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_in_progress(service):
        EmailService.send(
            subject="Your service is now in progress",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Our team has started working on your:

            {service.get_service_type_display()}.

            We'll notify you once the work has been completed.

            Thank you,
            Go Green Repairs
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_completed(service):
        EmailService.send(
            subject="Your service has been completed",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Your {service.get_service_type_display()} has been completed.

            Thank you for trusting Go Green Repairs with your project.

            We hope to work with you again in the future!
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_rejected(service):
        EmailService.send(
            subject="Update regarding your service request",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Unfortunately, we're unable to complete your request for:

            {service.get_service_type_display()}.

            If you have any questions, please contact us and we'd be happy to discuss your request.

            Thank you,
            Go Green Repairs
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def service_rescheduled(service):
        EmailService.send(
            subject="Your appointment has been rescheduled",
            message=f"""
            Hi {service.user.first_name or service.user.username},

            Your appointment has been rescheduled.

            New Appointment Date:
            {service.scheduled_date}

            If you have any questions, please contact us.

            Thank you,
            Go Green Repairs
            """,
                        recipient=service.user.email,
                    )

    @staticmethod
    def password_reset(user):
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.encoding import force_bytes
        from django.utils.http import urlsafe_base64_encode

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_link = (
            f"http://localhost:5173/reset-password/{uid}/{token}"
        )

        EmailService.send(
            subject="Reset your Go Green Repairs password",
            message=f"""
            Hi {user.first_name or user.username},

            We received a request to reset your password.

            Click the link below to create a new password:

            {reset_link}

            If you didn't request this, you can safely ignore this email.

            Thank you,
            Go Green Repairs
            """,
                    recipient=user.email,
                )