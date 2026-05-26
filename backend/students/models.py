from django.db import models

# Create your models here.
from django.db import models
from accounts.models import Tenant

class Student(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    course = models.CharField(max_length=100)
    joined_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.tenant.name},{self.name} - {self.phone} - {self.course}"
    