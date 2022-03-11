from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Genre


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'gender',
                  'picture', 'birthDate', 'oauth_type', 'category_list')
