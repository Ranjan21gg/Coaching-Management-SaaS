from rest_framework_simplejwt.authentication import JWTAuthentication

class TenantJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        result = super().authenticate(request)

        if result is None:
            return None

        user, token = result

        request.tenant_id = token.get('tenant_id')
        request.role = token.get('role')

        return (user, token)