from django.shortcuts import render, get_list_or_404, get_object_or_404
import requests
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from movies.recommend.genre_recommend import find_sim_movie
from .models import Movie, Genre, Rating
from .serializers import MovieListSerializer, MovieSerializer, GenreSerializer, MovieIdSerializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
import requests
import random
from bs4 import BeautifulSoup
from community.models import Review

from .recommend.mf_recommend import mf_recomnend
from .recommend.mf_recomn_user import user_recommend

# Create your views here.

key = "733c7d5145ecf236ad387093e2d52047"
poster_url = "https://image.tmdb.org/t/p/original/"
youtube_base_url = 'https://www.youtube.com/embed/'


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request,id):
    if request.method == 'GET':
        movie = Movie.objects.filter(id = id)
        serializers = MovieSerializer(movie, many=True)
        return Response(serializers.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def genre_list(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializers = GenreSerializer(genres, many=True)
        return Response(serializers.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_index(request):
    if request.method == 'GET':
        movie_list = []
        movies = Movie.objects.all()
        movielist = movies.order_by('-release_date')
        cnt = 1
        for movie in movielist:
            if movie.youtube_url and movie.overview != '':
                movie_list.append(movie)
                cnt += 1
            if cnt == 20:
                break
        serializer = MovieSerializer(movie_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def random_recommend(request):
    if request.method == 'GET':
        movie_list = []
        movies = Movie.objects.all()
        ran_index = random.sample(range(1,len(movies)), 20)
        for idx in ran_index:
            movie_list.append(movies[idx])
        serializer = MovieSerializer(movie_list, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_search(request, word):
    if request.method == 'GET':
        movies = Movie.objects.all()
        movie_list = []
        for movie in movies:
            if word in movie.title:
                movie_list.append(movie)
        serializer = MovieListSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def fordetail(request,word):
    if request.method == 'GET':
        movie_list = []
        movies = Movie.objects.filter(title=word)
        for movie in movies:
            if movie.title == word:
                movie_list.append(movie)
                break
        serializer = MovieSerializer(movie_list, many=True)
        return Response(serializer.data)




@api_view(['GET'])
@permission_classes([AllowAny])
def genre_movielist(request,id):
    if request.method == 'GET':
        movie_list = []
        movies = Movie.objects.filter(genres=id)
        for movie in movies:
            movie_list.append(movie)
        serializer = MovieIdSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def rating_movie(request,id,user):
    if request.method == 'GET':
        ratings = Rating.objects.filter(movie=id, user=user)
        data = ""
        if ratings:
            data = ratings[0].rank
        else:
            data = None
        return Response(data)


from accounts.models import User
@api_view(['POST'])
@permission_classes([AllowAny])
def rating(request):
    user = request.data['user']
    movie = request.data['movie']
    rank = request.data['rank']
    try:
        rating = Rating.objects.get(movie=movie, user=user)
        rating.rank = rank
        rating.save()
    except:
        user_id = User.objects.get(pk=user)
        movie_id = Movie.objects.get(pk=movie)
        rating = Rating.objects.create(user=user_id,rank=rank,movie=movie_id)
        rating.save()
    return Response()

@api_view(['GET'])
@permission_classes([AllowAny])
def recommend_genre(request, id):
    if request.method == 'GET':
        movie_df = find_sim_movie(id)
        # movie_list = movie_df['title'].values.tolist()
        rec_list = movie_df['title'].values.tolist()
        movie_list = []
        for movie in rec_list:
            movie_object = Movie.objects.filter(title=movie)
            movie_list.append(movie_object[0])
        serializer = MovieListSerializer(movie_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def mf_recommend(request,id):
    if request.method == 'GET':
        recommend_movie_list = mf_recomnend(id)
        movie_list = []
        for recommend in recommend_movie_list:
            movie = Movie.objects.filter(pk=recommend)
            movie_list.append(movie[0])
        serializer = MovieListSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def mf_user_recommend(request,id):
    if request.method == 'GET':
        user_history, recommendationList = user_recommend(id)
        print(recommendationList.values)
        movie_list = []
        for recommend in recommendationList.values:
            movie = Movie.objects.filter(pk=recommend[0])
            movie_list.append(movie[0])
        serializer = MovieListSerializer(movie_list, many=True)
        return Response(serializer.data)
