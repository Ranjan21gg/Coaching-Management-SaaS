from rest_framework_simplejwt.authentication import JWTAuthentication

class InstituteJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        result = super().authenticate(request)

        if result is None:
            return None

        user, token = result

        request.institute_id = token.get("institute_id")
        request.role = token.get("role")

        return (user, token)