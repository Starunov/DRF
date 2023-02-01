from django.urls import path
from .views import UserCustomViewSet


urlpatterns = [
    path('', UserCustomViewSet.as_view({'get': 'list'})),
]
