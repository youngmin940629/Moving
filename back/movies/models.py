from django.db import models
from django.conf import settings
# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Cast(models.Model):
    name = models.CharField(max_length=100)
    profile_path = models.CharField(max_length=200)
    gender = models.IntegerField()

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField(null=True)
    popularity = models.FloatField(null=True)
    runtime = models.IntegerField(null=True)
    vote_count = models.IntegerField()
    vote_average = models.FloatField()
    overview = models.TextField(null=True)
    backdrop_path = models.CharField(max_length=200,null=True) 
    poster_path = models.CharField(max_length=200,null=True) 
    youtube_url = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre)
    casts = models.ManyToManyField(Cast)

    def __str__(self):
        return self.title

class OnelineReview(models.Model):
    content = models.CharField(max_length=100)
    rank = models.IntegerField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)