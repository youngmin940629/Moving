from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('isstaff/',views.is_staff),
    path('<int:user_pk>/',views.user_info),
    path('edit/<int:user_id>/',views.edit),
    path('isexist/',views.isexist),
    path('changepassword/<int:user_id>/',views.changePassword),
    path('getuserpk/',views.get_userpk),
    path('change_password/', auth_views.PasswordChangeView.as_view())
]