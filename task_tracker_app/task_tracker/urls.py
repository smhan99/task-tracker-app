from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('add', views.add, name='add'),
    path('edit/<task_id>', views.edit, name="edit"),
    path('delete/<task_id>', views.delete, name="delete"),
    path('register', views.register, name='register'),
    path('login', views.login_view, name='login_view'),
    path('logout', views.logout_view, name='logout_view'),
]