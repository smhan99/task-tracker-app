from django.urls import path
from . import views

urlpatterns = [

    path('get_task', views.get_task, name="get_task"),
    path('get_task/<int:id>', views.get_task_detail, name="get_task_detail"),
    path('get_user_tasks/', views.get_user_tasks, name='user_tasks'),
    path('get_user_task_detail/<int:id>/', views.get_user_task_detail, name='get_user_task_detail'),
    path('sort_by_due_date_asc', views.sort_by_due_date_asc, name='sort_by_due_date_asc'),
    path('sort_by_due_date_desc', views.sort_by_due_date_desc, name='sort_by_due_date_desc'),
    path('sort_by_title_asc', views.sort_by_title_asc, name='sort_by_title_asc'),
    path('sort_by_title_desc', views.sort_by_title_desc, name='sort_by_title_desc'),
    path('sort_by_status_asc', views.sort_by_status_asc, name='sort_by_status_asc'),
    path('sort_by_status_desc', views.sort_by_status_desc, name='sort_by_status_desc'),

]