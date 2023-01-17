from django.contrib import admin
from .models import Project, ToDo


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'repo', 'count_editors']
    search_fields = ['name']

    def count_editors(self, obj):
        return ToDo.objects.filter(project_id=obj.pk).count()


class ToDoAdmin(admin.ModelAdmin):
    list_display = ['on_project', 'text', 'created_at', 'updated_at', 'author', 'is_actual']
    list_filter = ['user', 'is_actual']
    search_fields = ['text', 'user__username']

    def on_project(self, obj):
        return obj.project

    def author(self, obj):
        return obj.user


admin.site.register(Project, ProjectAdmin)
admin.site.register(ToDo, ToDoAdmin)
