from django.db import models
from rest_framework import serializers

from .models import Movie, Genre, OnelineReview


class OnelinereviewSerializer(serializers.ModelSerializer):

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
<<<<<<< Updated upstream
        fields = ('id', 'title', 'poster_path', 'vote_average', 'overview',)
=======
        fields = ('id','title','poster_path','vote_average','overview','release_date',)
>>>>>>> Stashed changes
