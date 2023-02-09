from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializerV1(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
        ]


class UserModelSerializerV2(ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
        ]
