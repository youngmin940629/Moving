from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import User


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
    print(data)

    data.pop("username")
    data.pop("email")
    data["username"] = email
    data["username2"] = username

    print(data)

    # 2. UserSerializer를 통해 데이터 직렬화
    serializer = UserSerializer(data=data)

    print(serializer)
    # 3. validation 작업 진행 -> password도 같이 직렬화 진행
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # 4. 비밀번호 해싱 후
        user.set_password(request.data.get('password'))
        user.save()
        # password는 직렬화 과정에는 포함 되지만 → 표현(response)할 때는 나타나지 않는다.
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_info(request,user_pk):
    user = get_object_or_404(User, pk=user_pk)
    serializers = UserSerializer(user)
    return Response(serializers.data)

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
