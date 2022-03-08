from django.contrib.auth import get_user_model
from django.shortcuts import render, get_list_or_404, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# from django.http import HttpResponse


from .models import Review, Comment
from .serializers import ReviewListSerializer, ReviewSerializer, CommentSerializer, ReviewReadSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny

# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def review_list(request):
    if request.method == 'GET':
        reviews = get_list_or_404(Review)
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
    else:
        serializer = ReviewReadSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        review.delete()
        data = {
            'delete' : f'리뷰가 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def comment(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        comment.delete()
        data = {
            'delete' : f'댓글이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def comment_create(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(review=review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def review_search(request, word):
    if request.method == 'GET':
        reviews = Review.objects.all()
        search_list = []
        for review in reviews:
            if word in review.title:
                search_list.append(review)
        if search_list:
            serializer = ReviewSerializer(search_list, many=True)
            return Response(serializer.data)
        else:
            data = {
                "일치하는 게시글이 없습니다."
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([AllowAny])
def like_user(request, review_pk):
    user_id = request.data['id']
    review = get_object_or_404(Review, pk=review_pk)
    likeUser = review.like_users.all()
    if likeUser.filter(pk=user_id):
        review.like_users.remove(user_id)
        liked = False
    else:
        review.like_users.add(user_id)
        liked = True
    data = {
        'liked' : liked,
        'count' : review.like_users.count()
    }
    return Response(data)