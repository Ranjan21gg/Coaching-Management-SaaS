# from django.shortcuts import render

# Create your views here.
# from rest_framework.exceptions import PermissionDenied

# from accounts.permissions import IsSubscribed
# from accounts.utils import has_active_subscription

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceViewSet(ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Attendance.objects.filter(
            institute_id=self.request.institute_id
        )

    def perform_create(self, serializer):
        serializer.save(
            institute_id=self.request.institute_id
        )

    def perform_update(self, serializer):
        serializer.save(
            institute_id=self.request.institute_id
        )

    # def get_object(self):
    #     obj = super().get_object()
    #     if obj.tenant != self.request.user.profile.tenant:
    #         raise PermissionDenied("Not allowed")
    #     return obj