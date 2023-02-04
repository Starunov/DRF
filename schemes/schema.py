import graphene
from graphene_django import DjangoObjectType

from users.models import User
from TODO.models import ToDo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    todos_by_project = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_todos_by_project(self, info, name=None):
        todos = ToDo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query)
