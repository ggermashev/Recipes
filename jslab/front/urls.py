from django.urls import path, include
from front.views import *

urlpatterns = [
    path('', main_page),
    path('registration/', main_page),
    path('login/', main_page),
    path('logout/', main_page),
    path('recipes/', main_page),
]