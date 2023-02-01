from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializerV1(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'firstname',
            'lastname',
            'email',
        ]


class UserModelSerializerV2(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
