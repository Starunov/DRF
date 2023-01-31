from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

