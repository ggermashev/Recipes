from django.urls import path, include
from front.views import *

urlpatterns = [
    path('', main_page),
    path('registration/', main_page),
    path('login/', main_page),
    path('logout/', main_page),
    path('recipes/', main_page),
    path('add_recipe/', main_page),
    path('recipe/<int:rec_id>/', recipe),
    path('list/', main_page),
    path('profile/', main_page),
    path('change_recipe/<int:rec_id>/', recipe),
    path('favorites/', main_page)
]
