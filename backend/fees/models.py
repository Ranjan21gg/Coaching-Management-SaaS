from django.db import models
from accounts.models import Institute
# Create your models here.
from django.utils import timezone
from django.db import models
from students.models import Student

class Fee(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    total_fee = models.IntegerField()
    paid_fee = models.IntegerField()

    # Billing Period
    date = models.DateField(default=timezone.localdate)

    # Record timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def due(self):
        return self.total_fee - self.paid_fee

    class Meta:
        ordering = ["-date"]
    
    def __str__(self):
        return f'{self.student.name} - {self.date}'