from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.text import slugify


# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

from .models import Institute, Membership
# from .models import Subscription
# from .utils import client



@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    institute_name = request.data.get('institute_name')

    if not username or not password or not institute_name:
        return Response({"error": "All fields required"}, status=400)

    # uniqe constraints check
    if User.objects.filter(username=username).exists():
       return Response(
           {"error": "Username already exists"},
           tatus=400
           )

    # create user
    user = User.objects.create_user(
        username=username,
        password=password
    )

    # slug generation
    slug = slugify(institute_name)
    
    # tenant generation (no duplicates)
    institute, _ = Institute.objects.get_or_create(
        slug=slug,
        defaults={
            "name": institute_name,
            "owner": user
        }
    )
    
    # link user to tenant
    Membership.objects.create(
        user=user,
        institute=institute,
        role='admin'
    )

    return Response({"msg": "User + Institute created Successfully"})



@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    institute_name = request.data.get('institute_name')  # instead of institute_name

    if not username or not password or not institute_name:
        return Response({"error": "All fields required"}, status=400)
    
    # generate slug
    slug = slugify(institute_name)

    # Find institute safely
    try:
        institute = Institute.objects.get(slug=slug)
    except Institute.DoesNotExist:
        return Response({"error": "Institute not found"},status=404)
    
    # Authenticate user
    user = authenticate(
        username=username,
        password=password
    )

    if not user:
        return Response({"error": "Invalid credentials"}, status=401)
    
    # Verify membership
    try:
        membership = Membership.objects.select_related('institute').get(
            user=user,
            institute__slug=slug
        )
    except Membership.DoesNotExist:
        return Response({"error": "Access denied for this institute"},status=403)
    
    # Generate JWT
    refresh = RefreshToken.for_user(user)

    # 🔥 ADD CUSTOM CLAIMS
    refresh['institute_id'] = membership.institute.id
    refresh['role'] = membership.role
    

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": membership.role,
        "institute": membership.institute.name,

        # REAL DISPLAY NAME
        "institute": institute.name,

        # optional
        "username": user.username
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