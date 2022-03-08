from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_index),
    path('recommend1/', views.random_recommend),
    path('search/<str:word>/', views.movie_search),
    path('recommend2/', views.genre_recommend),
    path('fordetail/<str:word>/', views.fordetail),
]
