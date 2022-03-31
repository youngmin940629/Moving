from django.shortcuts import render, get_list_or_404, get_object_or_404
import requests
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from accounts.models import User
from movies.recommend.genre_recommend import find_sim_movie
from .models import Movie, Genre, Rating, OnelineReview
from .serializers import MovieListSerializer, MovieSerializer, GenreSerializer, MovieIdSerializer,MoviePosterSerializer,MovieDetailSerializer, OnelinereviewSerializer
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
import requests
import random
from bs4 import BeautifulSoup
from community.models import Review
from datetime import datetime
from .recommend.mf_recommend import mf_recomnend
from .recommend.mf_recomn_user import user_recommend
from .recommend.categorylist import categoryPick
from .recommend.toprate import toprate

# Create your views here.

key = "733c7d5145ecf236ad387093e2d52047"
poster_url = "https://image.tmdb.org/t/p/original/"
youtube_base_url = 'https://www.youtube.com/embed/'


@api_view(['GET'])
@permission_classes([AllowAny])
def movie_detail(request,id):
    if request.method == 'GET':
        movie = Movie.objects.filter(id = id)
        serializers = MovieDetailSerializer(movie, many=True)
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
def recommend_genre(request, movie_id):
    if request.method == 'GET':
        movie_df = find_sim_movie(movie_id)
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
def mf_recommend(request,movie_id):
    if request.method == 'GET':
        recommend_movie_list = mf_recomnend(movie_id)
        if not recommend_movie_list:
            recommend_movie_list = find_sim_movie(movie_id)
        movie_list = []
        for recommend in recommend_movie_list:
            movie = Movie.objects.filter(pk=recommend)
            movie_list.append(movie[0])
        serializer = MovieListSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def mf_user_recommend(request,user_id):
    if request.method == 'GET':
        user_list = get_list_or_404(User)
        index = 0
        for i in range(len(user_list)):
            if user_list[i].pk == user_id:
                print(i)
                index = i
                break
        user_history, recommendationList = user_recommend(index, user_id)
        movie_list = []
        if recommendationList:
            for recommend in recommendationList.values:
                movie = Movie.objects.filter(pk=recommend[0])
                movie_list.append(movie[0])
        serializer = MovieListSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_category_recommend(request,user_id):
    if request.method == 'GET':
        user = get_object_or_404(User, pk=user_id)
        user_catetory = user.category_list.all()
        data = []
        for index in range(len(user_catetory)):
            recommend_list = []
            recommend_list.append(user_catetory[index].name)
            recommend_movies = categoryPick(user_catetory[index].id)
            if len(recommend_movies) > 20:
                recommend_movies = recommend_movies[:20]
            movie_list = []
            for movieId in recommend_movies["movie_id"]:
                movie = Movie.objects.filter(id=movieId)
                movie_list.append(movie[0])
            serializer = MoviePosterSerializer(movie_list, many=True)
            recommend_list.append(serializer.data)
            data.append(recommend_list)
        return Response(data)


@api_view(['GET'])
@permission_classes([AllowAny])
def top_rate(request):
    if request.method == 'GET':
        movie_list = []
        top_rating_movies = toprate()
        for movieId in top_rating_movies["movie_id"]:
            movie = Movie.objects.filter(id=movieId)
            movie_list.append(movie[0])
        serializer = MoviePosterSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def latest_movie(request):
    if request.method == 'GET':
        movie_list=[]
        movies = Movie.objects.all().order_by('-release_date')
        today = datetime.today().strftime("%Y-%m-%d")
        cnt = 0
        for movie in movies:
            if str(movie.release_date) < today:
                movie_list.append(movie)
                cnt += 1
            if cnt == 20:
                break
        serializer = MoviePosterSerializer(movie_list, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def scrap_check(request,user_id,movie_id):
    if request.method == "GET":
        data = []
        user = User.objects.get(id=user_id)
        scrap_list = user.scrap_movie.all()
        data.append(scrap_list.filter(id=movie_id).exists())
        return Response(data)

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def scrap(request,user_id):
    user = User.objects.get(id=user_id)
    scrap_list = user.scrap_movie.all()
    if request.method == "GET":
        scraps = []
        for scrap in scrap_list:
            scraps.append(scrap)
        serializers = MoviePosterSerializer(scraps, many=True)
        return Response(serializers.data)
    elif request.method == "POST":
        movie_id = request.data["movie_id"]
        user.scrap_movie.add(movie_id)
        return Response(["추가 성공"])

@api_view(['POST'])
@permission_classes([AllowAny])
def scrap_cancel(request,user_id):
    user = User.objects.get(id=user_id)
    if request.method == "POST":
        movie_id = request.data["movie_id"]
        user.scrap_movie.remove(movie_id)
        return Response(["삭제 성공"])

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def oneline_review(request,movie_id):
    if request.method == 'GET':
        try:
            onelinereview = get_list_or_404(OnelineReview, movie=movie_id)
            serializer = OnelinereviewSerializer(onelinereview, many=True)
            return Response(serializer.data)
        except:
            return Response([])
    elif request.method == 'POST':
        serializer = OnelinereviewSerializer(data = request.data)
        if serializer.is_valid():
            movie = Movie.objects.get(id=movie_id)
            serializer.save(user=request.user, movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT','DELETE'])
@permission_classes([AllowAny])
def oneline_review_detail(request,oneline_id):
    onelinereview = get_object_or_404(OnelineReview, id=oneline_id)
    if request.method == 'PUT':
        serializer = OnelinereviewSerializer(OnelineReview, data=request.data["data"])
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    elif request.method == 'DELETE':
        onelinereview.delete()
        data = {
            'delete' : f'리뷰가 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)

