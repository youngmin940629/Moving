from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token


urlpatterns = [
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('isstaff/',views.is_staff),
]