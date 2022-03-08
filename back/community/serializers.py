from django.db.models.query import QuerySet
from accounts.models import User
from rest_framework import serializers
from .models import Review, Comment


class ReviewReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('title','movie_title','content','rank',)
        # read_only_fields = ('comment',)

class ReviewSerializer(serializers.ModelSerializer):

    class CommentSerializer(serializers.ModelSerializer):
        def getUsername(self, obj):
            return obj.user.username
        username = serializers.SerializerMethodField("getUsername")
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
        fields = ('id', 'title', 'movie_title', 'created_at', 'user', 'username', 'comments',)

class CommentSerializer(serializers.ModelSerializer):
    
    def getUsername(self, obj):
        return obj.user.username
        
    username = serializers.SerializerMethodField("getUsername")

    class Meta:
        model = Comment
        fields = ('__all__')
        read_only_fileds = ('review',)
