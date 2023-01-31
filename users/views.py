from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.permissions import DjangoModelPermissions

from .models import User
from .serializers import UserModelSerializer
from rest_framework.viewsets import ModelViewSet

# class UserCustomViewSet(mixins.ListModelMixin,
#                         mixins.RetrieveModelMixin,
#                         mixins.UpdateModelMixin,
#                         viewsets.GenericViewSet,
#                         ):
class UserCustomViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
