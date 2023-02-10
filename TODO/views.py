from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import SAFE_METHODS
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelSerializerBase
from .filters import ProjectFilter
from .models import Project, ToDo


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    # serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase

    # def get_queryset(self):
    #     name = self.request.query_params.get('name', '')
    #     projects = Project.objects.all()
    #     if name:
    #         projects = projects.filter(name__contains=name)
    #     return projects


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.is_actual = False
        obj.save()
        from rest_framework import status
        return Response(status=status.HTTP_200_OK)
