from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

from .models import Tenant, Membership
# from .models import Subscription
# from .utils import client



@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    institute_name = request.data.get('slug')

    if not username or not password or not institute_name:
        return Response({"error": "All fields required"}, status=400)

    # create user
    user = User.objects.create_user(
        username=username,
        password=password
    )
    
    # create tenant (coaching)
    tenant = Tenant.objects.create(
        name=institute_name,
        slug=institute_name.replace(" ", "-"),
        owner=user
    )
    
    # link user to tenant
    Membership.objects.create(
        user=user,
        tenant=tenant,
        role='admin'
    )

    return Response({"msg": "User + Tenant created Successfully"})



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    slug = request.data.get('slug')  # instead of institute_name

    if not username or not password or not slug:
        return Response({"error": "All fields required"}, status=400)

    user = authenticate(
        username=username,
        password=password
    )

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)

    try:
        membership = Membership.objects.select_related('tenant').get(
            user=user,
            tenant__slug=slug
        )
    except Membership.DoesNotExist:
        return Response({"error": "Access denied for this institute"}, status=403)

    refresh = RefreshToken.for_user(user)

    # 🔥 ADD CUSTOM CLAIMS
    refresh['tenant_id'] = membership.tenant.id
    refresh['role'] = membership.role
    

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": membership.role,
        "tenant": membership.tenant.name
    })




# # subscription and permission
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_subscription(request):
#     tenant = request.user.profile.tenant

#     subscription = client.subscription.create({
#         "plan_id": "your_plan_id",
#         "customer_notify": 1,
#         "total_count": 12
#     })

#     Subscription.objects.update_or_create(
#         tenant=tenant,
#         defaults={
#             "razorpay_subscription_id": subscription['id'],
#             "plan": "basic",
#             "status": "created"
#         }
#     )

#     return Response(subscription)



# # accounts/views.py

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def activate_subscription(request):
#     tenant = request.user.profile.tenant

#     Subscription.objects.update_or_create(
#         tenant=tenant,
#         defaults={
#             "status": "active",
#             "plan": "test"
#         }
#     )
#     return Response({"msg": "Subscription activated (TEST MODE)"})