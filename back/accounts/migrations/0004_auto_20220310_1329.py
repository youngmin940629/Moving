# Generated by Django 3.2.3 on 2022-03-10 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0015_onelinereview'),
        ('accounts', '0003_auto_20220310_1327'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.AlterField(
            model_name='user',
            name='category_list',
            field=models.ManyToManyField(to='movies.Genre'),
        ),
    ]
