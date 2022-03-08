from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import get_user_model



@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data['passwordConfirmation']
    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def is_user(request):