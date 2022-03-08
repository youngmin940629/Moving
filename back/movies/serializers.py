from django.db import models
from rest_framework import serializers

from .models import Movie, Genre

class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    
    class GenreSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Genre
            fields = '__all__'

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
        fields = ('id', 'title' ,'poster_path','overview', 'release_date', 'vote_average', 'runtime')

class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = '__all__'