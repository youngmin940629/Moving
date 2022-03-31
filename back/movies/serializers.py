from dataclasses import field
from django.db import models
from rest_framework import serializers

from .models import Cast, Movie, Genre, OnelineReview
from accounts.models import User

class OnelinereviewSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'nickname2')
    user = UserSerializer(read_only=True)

    class Meta:
        model = OnelineReview
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    onelinereviews = OnelinereviewSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

class MovieListSerializer(serializers.ModelSerializer):

    class GenreSerializer(serializers.ModelSerializer):

        class Meta:
            model = Genre
            fields = '__all__'

    class Meta:
        model = Movie
        fields = ('id', 'title', 'poster_path', 'overview',
                  'release_date', 'vote_average', 'runtime')


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class MovieIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id',)


class MoviePosterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id','title','poster_path','vote_average','overview','release_date',)


class MovieDetailSerializer(serializers.ModelSerializer):
    
    class CastSerializer(serializers.ModelSerializer):

        class Meta:
            model = Cast
            fields = ('__all__')

    genres = GenreSerializer(many=True)
    casts = CastSerializer(many=True)

    class Meta:
        model = Movie
        fields = ('__all__')