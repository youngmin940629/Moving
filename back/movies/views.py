from django.shortcuts import render, get_list_or_404, get_object_or_404
import requests
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Movie, Genre
from .serializers import MovieListSerializer, MovieSerializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
import requests
import random
from bs4 import BeautifulSoup
from community.models import Review
# Create your views here.

key = "733c7d5145ecf236ad387093e2d52047"
poster_url = "https://image.tmdb.org/t/p/original/"
youtube_base_url = 'https://www.youtube.com/embed/'



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


@api_view(['POST'])
@permission_classes([AllowAny])
def genre_recommend(request):
    if request.method == 'POST':
        userId = int(list(request.data.keys())[0])
        reviews = Review.objects.filter(user_id=userId)
        like_genre = set()
        movie_list = []
        random_list = []
        genres_count = {
            '액션' : 0, '모험' : 0, '애니메이션' : 0, '코미디' : 0, '범죄' : 0,
            '다큐멘터리' : 0, '드라마' : 0, '가족' : 0, '판타지' : 0, '역사' : 0,
            '공포' : 0, '음악' : 0, '미스터리' : 0, '로맨스' : 0,
            'SF' : 0, 'TV 영화' : 0, '스릴러' : 0, '전쟁' : 0, '서부' : 0
        }
        genre_list = {
            '액션' : 28, '모험' : 12, '애니메이션' : 16, '코미디' : 35, '범죄' : 80,
            '다큐멘터리' : 99, '드라마' : 18, '가족' : 10751, '판타지' : 14, '역사' : 36,
            '공포' : 27, '음악' : 10402, '미스터리' : 9648, '로맨스' : 10749,
            'SF' : 878, 'TV 영화' : 10770, '스릴러' : 53, '전쟁' : 10752, '서부' : 37
        }
        if reviews.count():
            for review in reviews:
                movie = Movie.objects.filter(title=review.movie_title)
                if movie.exists():
                    genres = movie[0].genres.all()
                    for genre in genres:
                        genres_count[genre.name] += 1
            tmp_max = 0
            max_genre = ''
            for key, value in genres_count.items():
                if genres_count[key] > tmp_max:
                    tmp_max = value
                    max_genre = key
            movies = Movie.objects.none()
            like_genre.add(max_genre)
            if like_genre:
                movie = Movie.objects.filter(genres__in=[genre_list[max_genre]])
                movieList = movie.order_by('vote_average')[:100]
            else:
                movies = Movie.objects.all()
                movieList = movies.order_by('vote_average')[:100]
        else:
            movies = Movie.objects.all()
            movieList = movies.order_by('vote_average')[:100]
        for movie in movieList:
            movie_list.append(movie)
    ran_index = random.sample(range(1,len(movie_list)), 20)
    for idx in ran_index:
        random_list.append(movie_list[idx])
    serializer = MovieSerializer(random_list, many=True)
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