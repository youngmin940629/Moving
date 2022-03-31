from django.urls import path
from . import views

urlpatterns = [
    path('review/', views.review_list),
    path('review/<int:review_pk>/', views.review),
    path('review/<int:review_pk>/comment/', views.comment_create),
    path('comment/<int:comment_pk>/',views.comment),
    path('like/<int:review_pk>/<int:user_pk>/', views.like_user),
    path('visit_count/<int:review_pk>/', views.visit_count),
    path('review/search/title/<str:word>/', views.title_search),
    path('review/search/comment/<str:word>/', views.comment_search),
    path('review/search/nickname/<str:word>/', views.nickname_search),
    path('review/search/content/<str:word>/', views.content_search),
]
