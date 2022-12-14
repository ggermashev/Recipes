from rest_framework import serializers
from shopper.models import *


class UserSerializerAll(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'surname', 'nickname', 'photo' )



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'surname', 'login', 'password', 'nickname', 'photo' )


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('key', 'login', 'password')


class ReceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recept
        fields = "__all__"


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ("__all__")


class SavedReceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecept
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class LikedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedPost
        fields = "__all__"