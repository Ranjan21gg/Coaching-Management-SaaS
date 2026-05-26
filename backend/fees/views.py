from rest_framework.viewsets import ModelViewSet

from .models import Fee
from .serializers import FeeSerializer


class FeeViewSet(ModelViewSet):
    serializer_class = FeeSerializer

    def get_queryset(self):
        queryset = Fee.objects.filter(
            tenant_id=self.request.tenant_id
        )
        student_id = self.request.query_params.get("student")

        if student_id:
            queryset = queryset.filter(student_id=student_id)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(
            tenant_id=self.request.tenant_id
        )
