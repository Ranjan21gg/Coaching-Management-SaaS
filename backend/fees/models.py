from django.db import models
from accounts.models import Institute
# Create your models here.
from django.db import models
from students.models import Student

class Fee(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    total_fee = models.IntegerField()
    paid_fee = models.IntegerField()

    @property
    def due(self):
        return self.total_fee - self.paid_fee
    
    def __str__(self):
        return f'{self.student.name}'