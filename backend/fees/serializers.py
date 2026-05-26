from rest_framework import serializers
from .models import Fee


class FeeSerializer(serializers.ModelSerializer):
    due = serializers.ReadOnlyField()
    class Meta:
        model = Fee
        fields = '__all__'