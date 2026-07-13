from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Service(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),          
        ('confirmed', 'Confirmed'),       
        ('assessed', 'Assessed'),         
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected'),
        ('rescheduled', 'Rescheduled'),
        ]

    SERVICE_CHOICES = [
        ('hvac_installation', 'HVAC Installation'),
        ('hvac_repair', "HVAC Repair"),
        ('bakery_installation', 'Bakery Equipment Installation'),
        ('bakery_repair', 'Bakery Equipment Repair'),
        ('commerical_installation', 'Commercial Kitchen Equipment Installation'),
        ('commercial_repair','Commercial Kitchen Equipment Repair'),
        ('maintenance', 'Maintenance'),
        ('cleaning', 'Cleaning'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    service_type = models.CharField(max_length=100, choices = SERVICE_CHOICES)
    description = models.TextField()
    requested_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    # Admin-controlled fields
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    scheduled_date = models.DateField(null=True, blank=True)

    # Optional notes
    admin_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.service_type} : {self.status}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} ({self.rating}/5)"