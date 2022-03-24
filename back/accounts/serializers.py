from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Genre


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class GenreSerializer(serializers.ModelSerializer):

        class Meta:
            model = Genre
            fields = '__all__'
    category_list = GenreSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'gender',
                  'picture', 'birthDate', 'category_list', 'username2', 'scrap_movie',)

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'gender',
                  'picture', 'birthDate', 'category_list', 'username2', 'scrap_movie',)