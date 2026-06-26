from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.text import slugify

# Imports for forget passoword
import random
from .utils import send_mail
from .models import Institute, Membership, PasswordResetOTP
from django.conf import settings

from datetime import timedelta
from django.utils import timezone

# from .models import Subscription
# from .utils import client



@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    institute_name = request.data.get('institute_name')
    email = request.data.get("email")

    if not username or not password or not institute_name or not email:
        return Response({"error": "All fields required"}, status=400)

    # slug generation
    slug = slugify(institute_name)

    # uniqe constraints check
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=400
        )

    # tenant generation (no duplicates)
    if Institute.objects.filter(slug=slug).exists():
        return Response(
            {"error": "Institute already exists"},
            status=400
        )

    # create user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    institute = Institute.objects.create(
        slug=slug,
        name=institute_name,
        owner=user
        )
    
    # link user to tenant
    Membership.objects.create(
        user=user,
        institute=institute,
        defaults={"role": "admin"}
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
    membership = Membership.objects.filter(
        user=user,
        institute__slug=slug
    ).select_related('institute').first()

    if not membership:
        return Response(
            {"error": "Access denied for this institute"},
            status=403
            )
    
    
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



@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    username = request.data.get("username")
    institute_name = request.data.get("institute_name")
    email = request.data.get("email")

    if not username or not institute_name or not email:
        return Response(
            {"error": "All fields required"},
            status=400
        )

    slug = slugify(institute_name)

    try:
        institute = Institute.objects.get(slug=slug)
        membership = Membership.objects.select_related("user").get(
            user__username=username,
            institute=institute
        )

        user = membership.user

    except (Institute.DoesNotExist, Membership.DoesNotExist):
        return Response(
            {"error": "User not found"},
            status=404
        )

    if user.email != email:
        return Response(
            {"error": "Email does not match"},
            status=400
        )

    otp = str(random.randint(100000, 999999))

    print("OTP:", otp)
    print("Sending to:", email)

    PasswordResetOTP.objects.create(
        user=user,
        otp=otp,
        expires_at=timezone.now() + timedelta(minutes=5)
    )

    send_mail(
    "Password Reset OTP",
    f"Your OTP is {otp}",
    settings.EMAIL_HOST_USER,
    [email],
    fail_silently=False,
)

    return Response({
        "message": "OTP sent successfully"
    })



@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    username = request.data.get("username")
    otp = request.data.get("otp")
    new_password = request.data.get("new_password")

    # validation
    if not username or not otp or not new_password:
        return Response(
            {"error": "All fields required"},
            status=400
        )

    # find user
    try:
        user = User.objects.get(username=username)

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=404
        )

    # latest otp
    otp_record = PasswordResetOTP.objects.filter(
        user=user,
        otp=otp
    ).order_by("-created_at").first()

    # invalid otp
    if not otp_record:
        return Response(
            {"error": "Invalid OTP"},
            status=400
        )

    # expiry check
    if otp_record.is_expired():
        return Response(
            {"error": "OTP expired"},
            status=400
        )

    # reset password
    user.set_password(new_password)
    user.save()

    # delete all old OTPs
    PasswordResetOTP.objects.filter(
        user=user
    ).delete()

    return Response({
        "message": "Password reset successful"
    })


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def verify_otp(request):
    # username = request.data.get("username")
    # otp = request.data.get("otp")
    # new_password = request.data.get("new_password")

    # try:
    #     user = User.objects.get(username=username)
    #     otp_obj = PasswordResetOTP.objects.filter(
    #         user=user,
    #         otp=otp
    #     ).latest("created_at")

    # except Exception:
    #     return Response(
    #         {"error": "Invalid OTP"},
    #         status=400
    #     )

    # user.password = make_password(new_password)
    # user.save()
    # otp_obj.delete()

    # return Response({
    #     "message": "Password reset successful"
    # })


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):

    username = request.data.get("username")
    email = request.data.get("email")
    new_password = request.data.get("new_password")

    try:
        user = User.objects.get(username=username, email=email)

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=404
        )

    # check verified OTP exists
    otp_record = PasswordResetOTP.objects.filter(
        user=user,
        is_verified=True
    ).order_by("-created_at").first()

    if not otp_record:
        return Response(
            {"error": "OTP not verified"},
            status=403
        )

    if otp_record.is_expired():
        return Response(
            {"error": "OTP expired"},
            status=400
        )

    # reset password
    user.set_password(new_password)
    user.save()

    # cleanup OTPs (important)
    PasswordResetOTP.objects.filter(user=user).delete()

    return Response({
        "message": "Password reset successful"
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
