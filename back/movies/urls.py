from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_index),
    path('recommend1/', views.random_recommend),
    path('search/<str:word>/', views.movie_search),
    path('recommend2/', views.genre_recommend),
    path('fordetail/<str:word>/', views.fordetail),
    path('genre_list/', views.genre_list),
    path('<int:id>/', views.movie_detail),
    path('genre_movielist/<int:id>/', views.genre_movielist),
    path('rating/<int:id>/<int:user>/', views.rating_movie),
    path('rating_movie/', views.rating),
]
