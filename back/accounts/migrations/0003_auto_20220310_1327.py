# Generated by Django 3.2.3 on 2022-03-10 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20220310_1320'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='category_list',
        ),
        migrations.AddField(
            model_name='user',
            name='category_list',
            field=models.ManyToManyField(to='accounts.Category'),
        ),
    ]
