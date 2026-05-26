class TenantQuerySetMixin:
    def get_queryset(self):
        return self.queryset.filter(tenant_id=self.request.tenant_id)

    def perform_create(self, serializer):
        serializer.save(tenant_id=self.request.tenant_id)