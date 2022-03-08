from django.db import models
from django.conf import settings
# Create your models here.

class Review(models.Model):
    title = models.CharField(max_length=50)
    movie_title = models.CharField(max_length=500)
    content = models.TextField()
    rank = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_reviews', blank=True)

class Comment(models.Model):
    content = models.TextField()
    review = models.ForeignKey(Review, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
