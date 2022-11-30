from django.db import models
import datetime

class CustomUser(models.Model):
    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    login = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    nickname = models.CharField(max_length=64)
    photo = models.ImageField(null=True)
    key = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return self.nickname


class Category(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Recept(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey('Category', on_delete=models.RESTRICT, null=True)
    country = models.ForeignKey('Country', on_delete=models.RESTRICT, null=True)
    description = models.CharField(max_length=10000)
    ingredients = models.CharField(max_length=2048)
    likes = models.IntegerField(default=0)
    owner = models.ForeignKey('CustomUser', on_delete=models.SET_NULL, null=True)
    last_updated = models.DateField("Date", default=datetime.date.today)

    def __str__(self):
        return self.name


class Basket(models.Model):
    owner = models.ForeignKey('CustomUser', to_field='key', db_column='owner', on_delete=models.CASCADE)
    product = models.CharField(max_length=64)
    amount = models.CharField(max_length=32, null=True)
    status = models.BooleanField(null=True, default=1)

    def __str__(self):
        return self.owner


class SavedRecept(models.Model):
    user = models.ForeignKey('CustomUser', to_field='key', db_column='user', on_delete=models.CASCADE)
    recept = models.ForeignKey('Recept', on_delete=models.CASCADE)


class LikedPost(models.Model):
    user = models.ForeignKey('CustomUser', to_field='key', db_column='user', on_delete=models.CASCADE)
    recept = models.ForeignKey('Recept', on_delete=models.CASCADE)