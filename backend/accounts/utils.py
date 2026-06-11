# # accounts/utils.py
from django.core.mail import send_mail
from django.conf import settings

import threading


def send_otp_email(email, otp):

    send_mail(
        subject="Password Reset OTP",
        
        message=f"Your OTP is: {otp}",

        from_email=settings.EMAIL_HOST_USER,

        recipient_list=[email],

        fail_silently=False,
    )


def send_email_async(email, otp):

    thread = threading.Thread(
        target=send_otp_email,
        args=(email, otp)
    )

    thread.start()
# import razorpay
# from django.conf import settings

# client = razorpay.Client(
#     auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
# )

# # accounts/utils.py
# from .models import Subscription

# def get_tenant(user):
#     return user.profile.tenant


# def has_active_subscription(user):
#     tenant = user.profile.tenant

#     return Subscription.objects.filter(
#         tenant=tenant,
#         status="active"
#     ).exists()

