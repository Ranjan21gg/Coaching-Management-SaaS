from django.db import models
from accounts.models import Tenant
# Create your models here.
from django.db import models
from students.models import Student

class Fee(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    total_fee = models.IntegerField()
    paid_fee = models.IntegerField()

    @property
    def due(self):
        return self.total_fee - self.paid_fee
    
    def __str__(self):
        return f'{self.student.name}'