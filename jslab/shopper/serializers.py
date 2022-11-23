from rest_framework import serializers
from shopper.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class ReceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recept
        fields = "__all__"


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = "__all__"


class SavedReceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecept
        fields = "__all__"