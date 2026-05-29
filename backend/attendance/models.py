from django.db import models

# Create your models here.
from students.models import Student
from accounts.models import Institute


class Attendance(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    present = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.institute.name},{self.student.name} - {self.date}"
    