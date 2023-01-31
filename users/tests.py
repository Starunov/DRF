from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APISimpleTestCase
from django.contrib.auth.models import User as DjangoUser

from .models import User
from .views import UserCustomViewSet


def create_admin():
    return DjangoUser.objects.create_superuser('admin', 'admin@admin.ru', 'admin')


def create_user():
    user = User.objects.create(
        username='Романов Валера',
        firstname='Валера',
        lastname='Романов',
        email='valera@yandex.ru'
    )
    return user


def get_user():
    return {
        'username': 'Романов Валера',
        'firstname': 'Валера',
        'lastname': 'Романов',
        'email': 'valera@yandex.ru'
    }


def get_other_user():
    return {
        'username': 'Брошкин Иван',
        'firstname': 'Иван',
        'lastname': 'Брошкин',
        'email': 'vanka@yandex.ru'
    }


class TestUserViewSet(TestCase):

    def test_create_admin(self):
        admin = create_admin()
        self.assertEqual(admin.username, 'admin')
        self.assertEqual(admin.is_superuser, True)

    def test_create_user(self):
        user = create_user()
        self.assertEqual(user.username, 'Романов Валера')
        self.assertEqual(type(user), User)

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        factory = APIRequestFactory()
        user = create_user()
        request = factory.get(f'/api/users/{user.id}/')
        view = UserCustomViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=user.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_created_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', get_user())
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_created_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', get_user())
        admin = create_admin()
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email='valera@yandex.ru')
        self.assertEqual(user.username, 'Романов Валера')

    def test_update_guest(self):
        factory = APIRequestFactory()
        user = create_user()
        request = factory.put(f'/api/users/{user.id}/', get_other_user())
        view = UserCustomViewSet.as_view({'put': 'update'})
        response = view(request, pk=user.id)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_admin(self):
        factory = APIRequestFactory()
        user = create_user()
        admin = create_admin()
        request = factory.put(f'/api/users/{user.id}/', get_other_user())
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'put': 'update'})
        response = view(request, pk=user.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.firstname, 'Иван')
        self.assertEqual(user.username, 'Брошкин Иван')

    def test_delete_guest(self):
        factory = APIRequestFactory()
        user = create_user()
        request = factory.delete(f'/api/users/{user.id}/')
        view = UserCustomViewSet.as_view({'delete': 'destroy'})
        response = view(request, pk=user.id)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_admin(self):
        factory = APIRequestFactory()
        user = create_user()
        admin = create_admin()
        request = factory.delete(f'/api/users/{user.id}/')
        force_authenticate(request, admin)
        view = UserCustomViewSet.as_view({'delete': 'destroy'})
        response = view(request, pk=user.id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaisesMessage(User.DoesNotExist, 'User matching query does not exist'):
            User.objects.get(id=user.id)


class TestFuncs(APISimpleTestCase):

    def test_get_added_user(self):
        user = get_user()
        self.assertEqual(type(user), dict)
        self.assertEqual(user.get('username'), 'Романов Валера')
        self.assertEqual(user.get('firstname'), 'Валера')
        self.assertEqual(user.get('lastname'), 'Романов')
        self.assertEqual(user.get('email'), 'valera@yandex.ru')

    def test_get_other_user(self):
        user = get_other_user()
        self.assertEqual(type(user), dict)
        self.assertEqual(user.get('username'), 'Брошкин Иван')
        self.assertEqual(user.get('firstname'), 'Иван')
        self.assertEqual(user.get('lastname'), 'Брошкин')
        self.assertEqual(user.get('email'), 'vanka@yandex.ru')
