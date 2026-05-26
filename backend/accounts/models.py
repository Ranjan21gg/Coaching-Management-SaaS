from django.db import models

# Create your models here.
# accounts/models.py

from django.db import models
from django.contrib.auth.models import User

class Tenant(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)  # used for login (better than name)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.name}'


class Membership(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    class Meta:
        unique_together = ('user', 'tenant')
    
    def __str__(self):
        return f'{self.tenant}'



# class Subscription(models.Model):
#     tenant = models.OneToOneField(Tenant, on_delete=models.CASCADE)
#     razorpay_subscription_id = models.CharField(max_length=200)
#     plan = models.CharField(max_length=50)
#     status = models.CharField(max_length=50)  # created, active, cancelled
#     start_date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.tenant.name} - {self.status}"