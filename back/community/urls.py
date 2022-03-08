from django.urls import path
from . import views

urlpatterns = [
    path('review/', views.review_list),
    path('review/<int:review_pk>/', views.review),
    path('review/<int:review_pk>/comment/', views.comment_create),
    path('comment/<int:comment_pk>/',views.comment),
    path('review/<str:word>/', views.review_search),
    path('like/<int:review_pk>/', views.like_user),
]
