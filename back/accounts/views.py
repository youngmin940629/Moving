from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, UserSignupSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import User
from movies.models import Rating,Movie
from django.core.mail import send_mail
from django.conf import settings
from .tokens import account_activation_token
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.shortcuts import render

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    # print(request.data)
    # 1-1. Client에서 온 데이터를 받아서
    password = request.data.get('password')

    # 1-2. 패스워드 일치 여부 체크

    # 1-3, obtain_jwt_token과정 위해 email을 username으로 저장.(username => username2)
    email = request.data.get("email")
    username = request.data.get("username")
    data = request.data.copy()
    # print(data)

    data.pop("username")
    data.pop("email")
    data["username"] = email
    data["username2"] = username
    data["is_active"] = False

    # 2. UserSerializer를 통해 데이터 직렬화
    serializer = UserSignupSerializer(data=data)

    # 3. validation 작업 진행 -> password도 같이 직렬화 진행
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # 4. 비밀번호 해싱 후
        user.set_password(request.data.get('password'))
        user.save()
        user_id = User.objects.get(pk=user.id)
        movie_id = Movie.objects.get(pk=5)
        rating = Rating.objects.create(user=user_id,rank=0,movie=movie_id)
        rating.save()

        current_site = get_current_site(request)
        message = render_to_string('activation_email.html',
        {
            'user':user,
            'domain':current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(user.pk)).encode().decode(),
            'token':account_activation_token.make_token(user),
        })
        send_mail(
            subject='Moving | email 인증으로 계정을 활성화하세요.',
            message=message,
            from_email = settings.EMAIL_HOST_USER,
            recipient_list=[email],
            html_message=message,
        )
        print(account_activation_token)

        # password는 직렬화 과정에는 포함 되지만 → 표현(response)할 때는 나타나지 않는다.
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE'])
@permission_classes([AllowAny])
def user_info(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    if request.method == 'GET':
        serializers = UserSerializer(user)
        return Response(serializers.data)
    elif request.method == 'DELETE': # 탈퇴
        user.delete()
        data = {
            'delete' : f'탈퇴되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([AllowAny])
def is_staff(request):
    print(request.data)
    userId = int(list(request.data.keys())[0])
    userlist = get_user_model().objects.all()
    staffId = 0
    for user in userlist:
        if user.is_staff:
            staffId = user.id
    if userId == staffId:
        data = {
            True
        }
        return Response(data)
    else:
        data = {
            False
        }
        return Response(data)

from movies.models import Genre
@api_view(['PUT'])
@permission_classes([AllowAny])
def edit(request,user_id):
    if request.method == 'PUT':
        user = get_object_or_404(User, pk=user_id)
        data= request.data
        for d in data:
            if d == "username2":
                user.username2 = data[d]
            elif d == "category_list":
                genres_list = list(map(int,str(data[d])[1:-1].split(',')))
                user.category_list.clear()
                for genre in genres_list:
                    user.category_list.add(Genre.objects.get(pk=genre))
            elif d=="picture":
                user.picture = data[d]
        user.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny])
def isexist(request):
    if request.method=="POST":
        try:
            user = get_object_or_404(User, username2=request.data['username2'])
            return Response(True)
        except:
            return Response(False)

@api_view(['PUT'])
@permission_classes([AllowAny])
def changePassword(request,user_id):
    if request.method == 'PUT':
        user = get_object_or_404(User, pk=user_id)
        password = request.data["password"]
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_200_OK)



from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
@authentication_classes((JSONWebTokenAuthentication,))
def get_userpk(request):
    data = {'pk' : request.user.pk,'email_authenticated':request.user.is_active}
    return Response(data)



def activate(request, uid64, token):
    uid = force_text(urlsafe_base64_decode(uid64))
    user = User.objects.get(pk=uid)
    user.is_active = True
    user.save()
    return render(request,'activate.html')

