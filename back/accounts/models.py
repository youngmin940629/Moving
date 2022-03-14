from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Genre


class User(AbstractUser):
    picture = models.CharField(max_length=255, null=True, blank=True)
    category_list = models.ManyToManyField(Genre, blank=True)
    birthDate = models.DateField(null=True,blank=True)
    gender = models.BooleanField(default=True)
    oauth_type = models.CharField(max_length=255, null=True,blank=True)
    username2 = models.CharField(max_length=255,null=True,blank=True)
