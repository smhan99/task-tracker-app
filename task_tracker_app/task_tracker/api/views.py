from .serializers import TaskSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from task_tracker.models import Task
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout



# API VIEWS

# SHOWS ALL TASKS, ADMIN CAN CREATE AND GET ALL TASKS
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def get_task(request):
    if request.method == 'GET':
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)  
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# SHOWS A SINGLE SELECTED TASK, ADMIN CAN CREATE, EDIT AND DELETE ANY SINGLE TASK
@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def get_task_detail(request, id):

    try:
        task = Task.objects.get(pk=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TaskSerializer(task) 
        return Response(serializer.data)
        
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# SHOWS ALL TASKS ASSOCIATED WITH A SINGLE USER || USER CAN CREATE NEW TASKS

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_user_tasks(request):
    if request.method == 'GET':
        user = request.user
        tasks = Task.objects.filter(user=user)
        serializer = TaskSerializer(tasks, many=True)  
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# USER CAN VIEW INDIVIDUAL TASK || USER CAN EDIT TASK || USER CAN DELETE TASK

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_user_task_detail(request, id):
    try:
        task = Task.objects.get(pk=id, user=request.user)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TaskSerializer(task) 
        return Response(serializer.data)
        
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




# REGISTER USER

# LOGIN USER

# LOGOUT USER


# USER SORT TASKS BY DUE DATE ASCENDING ORDER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_due_date_asc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('due_date')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# USER SORT TASKS BY DUE DATE DESCENDING ORDER 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_due_date_desc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('-due_date')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# USER SORT TASKS BY TITLE ASCENDING ORDER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_title_asc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('task')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# USER SORT TASKS BY TITLE DESCENDING ORDER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_title_desc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('-task')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# USER SORT TASK BY STATUS ASCENDING ORDER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_status_asc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('status')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# USER SORT TASK BY STATUS DESCENDING ORDER

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sort_by_status_desc(request):
    user = request.user
    tasks = Task.objects.filter(user=user).order_by('-status')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)