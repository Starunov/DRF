import json

from django.contrib.auth.models import User as DjangoUser
from django.core.serializers import serialize
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from mixer.backend.django import mixer

from .models import Project, ToDo

from users.models import User


def create_admin():
    DjangoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
    return {
        'username': 'admin',
        'password': 'admin'
    }


def create_user():
    return mixer.blend(User, firstname='Валера')


def create_project():
    return mixer.blend(Project, users=[create_user() for _ in range(3)])


def get_project(name=''):
    project = mixer.blend(Project, name=name, users=[create_user() for _ in range(3)])
    return json.loads(serialize('json', [project]))[0]['fields']


def create_todo():
    return mixer.blend(ToDo, is_actual=True, project=create_project(), user=create_user())


def get_todo(text=''):
    todo = mixer.blend(ToDo, text=text, project=create_project(), user=create_user())
    return json.loads(serialize('json', [todo]))[0]['fields']


class TestProjectViewSet(TestCase):

    def test_create_admin(self):
        admin = create_admin()
        self.assertEqual(type(admin), dict)
        self.assertEqual(admin['username'], 'admin')
        self.assertEqual(admin['password'], 'admin')

    def test_create_user(self):
        user = create_user()
        self.assertEqual(type(user), User)
        self.assertEqual(user.firstname, 'Валера')

    def test_create_project(self):
        project = create_project()
        user, *user_more = project.users.iterator()
        self.assertEqual(type(project), Project)
        self.assertEqual(type(user), User)

    def test_get_project(self):
        project = get_project(name='Название проекта')
        self.assertEqual(type(project), dict)
        self.assertEqual(type(project.get('users')), list)
        self.assertEqual(project.get('name'), 'Название проекта')

    def test_get_list(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = create_project()
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        client = APIClient()
        response = client.post('/api/projects/', get_project())
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        client = APIClient()
        admin = create_admin()
        client.login(**admin)
        response = client.post('/api/projects/', get_project(name='Проект'))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_guest(self):
        project = create_project()
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', get_project(name='Другой проект'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_admin(self):
        project = create_project()
        admin = create_admin()
        client = APIClient()
        client.login(**admin)
        response = client.put(f'/api/projects/{project.id}/', get_project(name='Другой проект'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(pk=project.id)
        self.assertEqual(project.name, 'Другой проект')

    def test_delete_guest(self):
        project = create_project()
        client = APIClient()
        response = client.delete(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_admin(self):
        project = create_project()
        admin = create_admin()
        client = APIClient()
        client.login(**admin)
        response = client.delete(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaisesMessage(Project.DoesNotExist, 'Project matching query does not exist'):
            Project.objects.get(pk=project.id)


class TestTodoViewSet(APITestCase):

    def test_create_todo(self):
        todo = create_todo()
        self.assertEqual(type(todo), ToDo)
        self.assertEqual(type(todo.user), User)
        self.assertEqual(type(todo.project), Project)

    def test_get_todo(self):
        todo = get_todo(text='Текст задачи')
        self.assertEqual(type(todo), dict)
        self.assertEqual(type(todo.get('is_actual')), bool)
        self.assertEqual(todo.get('text'), 'Текст задачи')

    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo = create_todo()
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        response = self.client.post('/api/todos/', get_todo('Задача'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        self.client.login(**create_admin())
        todo = get_todo()
        todo['text'] = 'Задача'
        response = self.client.post('/api/todos/', todo)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_guest(self):
        todo = create_todo()
        response = self.client.put(f'/api/todos/{todo.id}/', get_todo('Другая задача'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_admin(self):
        todo = create_todo()
        self.client.login(**create_admin())
        response = self.client.put(f'/api/todos/{todo.id}/', get_todo('Другая задача'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(pk=todo.id)
        self.assertEqual(todo.text, 'Другая задача')

    def test_delete_guest(self):
        todo = create_todo()
        response = self.client.delete(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_admin(self):
        todo = create_todo()
        self.client.login(**create_admin())
        response = self.client.delete(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(todo.is_actual, True)
        todo = ToDo.objects.get(pk=todo.id)
        self.assertEqual(todo.is_actual, False)
