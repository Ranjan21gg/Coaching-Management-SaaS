from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
# from rest_framework.exceptions import PermissionDenied
# from accounts.permissions import IsSubscribed

# students/views.py

from rest_framework.response import Response
# from accounts.utils import get_tenant, has_active_subscription

from rest_framework.viewsets import ModelViewSet
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(ModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Student.objects.filter(
            tenant_id=self.request.tenant_id
        )

    def perform_create(self, serializer):
        serializer.save(
            tenant_id=self.request.tenant_id
        )

    # def create(self, request, *args, **kwargs):
    #     if not has_active_subscription(request.user):
    #         return Response({"error": "No active subscription"}, status=403)
    #     return super().create(request, *args, **kwargs)



from rest_framework.viewsets import ModelViewSet
from .models import Student
from .serializers import StudentSerializer
from backend.mixins import TenantQuerySetMixin

class StudentViewSet(TenantQuerySetMixin, ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer