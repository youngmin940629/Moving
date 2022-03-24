from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_index),
    path('recommend1/', views.random_recommend),
    path('search/<str:word>/', views.movie_search),
    path('fordetail/<str:word>/', views.fordetail),
    path('genre_list/', views.genre_list),
    path('<int:id>/', views.movie_detail),
    path('genre_movielist/<int:id>/', views.genre_movielist),
    path('rating/<int:id>/<int:user>/', views.rating_movie),
    path('rating_movie/', views.rating),
    path('genre_rec/<int:movie_id>/', views.recommend_genre),
    path('mf_recommend/<int:movie_id>/', views.mf_recommend),
    path('mf_user_recommend/<int:user_id>/', views.mf_user_recommend),
    path('user_category_recommend/<int:user_id>/', views.user_category_recommend),
    path('top_rate/', views.top_rate),
    path('latest_movie/', views.latest_movie),
    path('scrap_check/<int:user_id>/<int:movie_id>/', views.scrap_check),
    path('scrap/<int:user_id>/', views.scrap),
    path('scrap_cancel/<int:user_id>/', views.scrap_cancel),
]
