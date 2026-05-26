"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from students.views import StudentViewSet
from fees.views import FeeViewSet
from attendance.views import AttendanceViewSet
from accounts.views import register, login

router = DefaultRouter()
# router.register('students', StudentViewSet)
router.register('students', StudentViewSet, basename='students')
router.register('fees', FeeViewSet, basename='fees')
router.register('attendance', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('api/register/', register),
    path('api/login/', login),
    # path("api/webhook/", razorpay_webhook),
    # path("api/test-activate/", activate_subscription),
]