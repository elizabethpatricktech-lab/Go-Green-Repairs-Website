from django.urls import path
from . import views

urlpatterns = [
    path("services/", views.get_services),
    path("reviews/", views.reviews),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("services/create/", views.create_service, name="create_service"),
    path("profile/", views.get_profile, name="profile"),
    path("services/<int:id>/", views.get_service),
    path("forgot-password/", views.ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/", views.ResetPasswordView.as_view(), name="reset-password"),
    path("verify-email/", views.VerifyEmailView.as_view()),
    path("resend-verification/", views.ResendVerificationEmailView.as_view()),
]