from django.db import models


class CustomUser(models.Model):
    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    login = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    nickname = models.CharField(max_length=64)
    photo = models.ImageField(null=True)
    key = models.CharField(max_length=16, null=True)


class Category(models.Model):
    name = models.CharField(max_length=64)


class Country(models.Model):
    name = models.CharField(max_length=128)


class Recept(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey('Category', on_delete=models.RESTRICT, null=True)
    country = models.ForeignKey('Country', on_delete=models.RESTRICT, null=True)
    description = models.CharField(max_length=4096)
    ingredients = models.CharField(max_length=2048)
    likes = models.IntegerField(default=0)
    owner = models.ForeignKey('CustomUser', on_delete=models.SET_NULL, null=True)
    last_updated = models.DateField()


class Basket(models.Model):
    owner = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    product = models.CharField(max_length=64)
    amount = models.CharField(max_length=32)


class SavedRecept(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    recept = models.ForeignKey('Recept', on_delete=models.CASCADE)


