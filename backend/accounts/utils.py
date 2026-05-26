# # accounts/utils.py
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