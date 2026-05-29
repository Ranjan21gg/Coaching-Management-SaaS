class InstituteQuerySetMixin:
    def get_queryset(self):
        return self.queryset.filter(institute_id=self.request.institute_id)

    def perform_create(self, serializer):
        serializer.save(institute_id=self.request.institute_id)