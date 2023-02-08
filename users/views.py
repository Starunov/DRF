from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.permissions import DjangoModelPermissions

from .models import User
from .serializers import UserModelSerializerV1, UserModelSerializerV2
from rest_framework.viewsets import ModelViewSet

# class UserCustomViewSet(mixins.ListModelMixin,
#                         mixins.RetrieveModelMixin,
#                         mixins.UpdateModelMixin,
#                         viewsets.GenericViewSet,
#                         ):


class UserCustomViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializerV2

    # def get_serializer_class(self):
    #     if self.request.version == '0.1':
    #         return UserModelSerializerV1
    #     elif self.request.version == '0.2':
    #         return UserModelSerializerV2
