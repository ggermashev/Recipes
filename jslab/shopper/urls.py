from django.urls import path, include
from rest_framework import routers
from shopper.views import *

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('login', LoginViewSet)
router.register('recepts', ReceptViewSet)
router.register('basket', BasketViewSet)
router.register('saved_recepts', SavedReceptViewSet)
router.register('countries', CountryViewSet)
router.register('categories', CategoryViewSet)
router.register('liked_recepts', LikedPostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),

]
