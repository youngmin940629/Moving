# Generated by Django 3.2.3 on 2022-03-10 01:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0009_review_movie'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='movie_title',
        ),
    ]