from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Genre

    

class User(AbstractUser):
    picture = models.CharField(max_length=255,null=True)
    category_list = models.ManyToManyField(Genre)
    age = models.DateField(null=True)
    gender = models.BooleanField(default=True)
    oauth_type = models.CharField(max_length=255,null=True)