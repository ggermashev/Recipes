import string
from random import random

from django.db.models import F
from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from shopper.models import *
from shopper.serializers import *
import numpy as np


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'key'

    def list(self, request, *args, **kwargs):
        raise Http404

    def destroy(self, request, *args, **kwargs):
        raise Http404

    def create(self, request, *args, **kwargs):
        choice = list(string.ascii_lowercase + string.ascii_uppercase + string.digits)
        key = ''.join(np.random.choice(choice, 16))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['key'] = key
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        key = kwargs.get('key')
        queryset = CustomUser.objects.get(key=key)
        serializer = UserSerializer(queryset)
        return Response(serializer.data)


class LoginViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = LoginSerializer

    def list(self, request, *args, **kwargs):
        raise Http404

    def retrieve(self, request, *args, **kwargs):
        raise Http404

    def destroy(self, request, *args, **kwargs):
        raise Http404

    def update(self, request, *args, **kwargs):
        raise Http404

    def create(self, request, *args, **kwargs):
        login = request.data['login']
        password = request.data['password']
        if CustomUser.objects.get(login=login).password == password:
            serializer = LoginSerializer(CustomUser.objects.get(login=login))
            return Response(serializer.data)
        else:
            raise Http404


class ReceptViewSet(viewsets.ModelViewSet):
    queryset = Recept.objects.all().order_by('name')
    serializer_class = ReceptSerializer

    # def update(self, request, *args, **kwargs):
    #     likes = request.data.likes
    #     id = request.data.id
    #     Recept.objects.get(id=id).likes = likes
    #     serializer = ReceptSerializer(Recept.objects.get(id=id))
    #     return Response(serializer.data)


class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    lookup_field = 'info'

    # def list(self, request, *args, **kwargs):
    #     raise Http404

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        query = Basket.objects.filter(owner=request.data['owner'])
        serializer = BasketSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def retrieve(self, request, *args, **kwargs):
        info = kwargs.get('info').split(';')
        user_id = info[0]
        queryset = Basket.objects.filter(owner=user_id)
        if len(info) >= 2:
            product = info[1]
            queryset = queryset.filter(product=product)
        serializer = BasketSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        info = kwargs.get('info').split(';')
        user_id = info[0]
        queryset = Basket.objects.filter(owner=user_id)
        product = info[1]
        queryset = queryset.filter(product=product)
        queryset.delete()
        queryset = Basket.objects.filter(owner=user_id)
        serializer = BasketSerializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        info = kwargs.get('info').split(';')
        user_id = info[0]
        queryset = Basket.objects.filter(owner=user_id)
        if len(info) >= 2:
            product = info[1]
            queryset = queryset.filter(product=product)
        status = request.data.get('status')
        if status == 'true':
            status = True
        else:
            status = False
        queryset.update(status=status)
        queryset = Basket.objects.filter(owner=user_id)
        serializer = BasketSerializer(queryset, many=True)
        return Response(serializer.data)


class SavedReceptViewSet(viewsets.ModelViewSet):
    queryset = SavedRecept.objects.all()
    serializer_class = SavedReceptSerializer
    lookup_field = 'info'

    def retrieve(self, request, *args, **kwargs):
        info = kwargs.get('info').split(';')
        user_id = info[0]
        queryset = SavedRecept.objects.filter(user=user_id)
        if len(info) >= 2:
            recept_id = info[1]
            queryset = queryset.filter(recept=recept_id)
        serializer = SavedReceptSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        info = kwargs.get('info').split(';')
        user_id = info[0]
        queryset = SavedRecept.objects.filter(user=user_id)
        recept_id = info[1]
        queryset = queryset.filter(recept=recept_id)
        serializer = SavedReceptSerializer(queryset, many=True)
        queryset.delete()
        return Response(serializer.data)


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def destroy(self, request, *args, **kwargs):
        return Http404

    def update(self, request, *args, **kwargs):
        return Http404


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def destroy(self, request, *args, **kwargs):
        return Http404

    def update(self, request, *args, **kwargs):
        return Http404


class LikedPostViewSet(viewsets.ModelViewSet):
    queryset = LikedPost.objects.all()
    serializer_class = LikedPostSerializer
    lookup_field = 'user'

    def retrieve(self, request, *args, **kwargs):
        key = kwargs.get('user')
        query = LikedPost.objects.filter(user=key)
        serializer = LikedPostSerializer(query, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = request.data['user']
        recept = request.data['recept']
        if (len(LikedPost.objects.filter(user=user)) == 0):
            Recept.objects.filter(id=recept).update(likes=F('likes')+1)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            serializer = ReceptSerializer(Recept.objects.get(id=recept))
            return Response(serializer.data)
        elif (len(LikedPost.objects.filter(user=user).filter(recept=recept)) == 0):
            Recept.objects.filter(id=recept).update(likes=F('likes')+1)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            serializer = ReceptSerializer(Recept.objects.get(id=recept))
            return Response(serializer.data)
        else:
            Recept.objects.filter(id=recept).update(likes=F('likes')-1)
            LikedPost.objects.filter(user=user).get(recept=recept).delete()
            serializer = ReceptSerializer(Recept.objects.get(id=recept))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
