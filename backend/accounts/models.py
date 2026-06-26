from django.db import models

# Create your models here.
# accounts/models.py

from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify

class Institute(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)  # used for login (better than name)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'





class Membership(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    class Meta:
        unique_together = ('user', 'institute')
    
    def __str__(self):
        return f'{self.institute}-{self.user}'




class PasswordResetOTP(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username} - {self.otp}"
    
    def is_expired(self):
        return timezone.now() > self.expires_at
    
   


    
# class Subscription(models.Model):
#     Institute = models.OneToOneField(Tenant, on_delete=models.CASCADE)
#     razorpay_subscription_id = models.CharField(max_length=200)
#     plan = models.CharField(max_length=50)
#     status = models.CharField(max_length=50)  # created, active, cancelled
#     start_date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.tenant.name} - {self.status}"