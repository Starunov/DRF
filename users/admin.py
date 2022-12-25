from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'lastname', 'email')
    list_display_links = ('firstname', 'lastname')


admin.site.register(User, UserAdmin)
