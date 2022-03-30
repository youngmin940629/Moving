from django.db.models.query import QuerySet
from accounts.models import User
from rest_framework import serializers
from .models import Review, Comment
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'picture',)

class ReviewReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('title','content','rank','movie')
        # read_only_fields = ('comment',)

class ReviewSerializer(serializers.ModelSerializer):

    class CommentSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
            model = Comment
            fields = ('__all__')

    comments = CommentSerializer(many=True, read_only=True)
    
    def getUsername(self, obj):
        return obj.user.username
        
    username = serializers.SerializerMethodField("getUsername")

    class Meta:
        model = Review
        fields = '__all__'
        # read_only_fields = ('comment',)

class ReviewListSerializer(serializers.ModelSerializer):
    
    def getUsername(self, obj):
        return obj.user.username
        
    username = serializers.SerializerMethodField("getUsername")
    class CommentSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = ('__all__')

    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):
    
    def getUsername(self, obj):
        return obj.user.username
        
    username = serializers.SerializerMethodField("getUsername")
    
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('__all__')
        read_only_fileds = ('review',)
