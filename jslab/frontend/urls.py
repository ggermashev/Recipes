from django.urls import path, include
from frontend.views import *

urlpatterns = [
    path('', main_page),
]