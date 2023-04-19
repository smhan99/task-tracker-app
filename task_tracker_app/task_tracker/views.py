from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .models import Task
from django.contrib import messages
from .forms import TaskForm, EditTaskForm, LoginForm
from django.shortcuts import get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

# Create your views here.


def home(request):
    if request.user.is_authenticated:
        user = request.user
        all_tasks = user.tasks.all()
        print(user.tasks)
        return render(request, "home.html", {'all_tasks': all_tasks})
    else:
        return redirect('login_view')


def add(request):
    if request.method == 'POST':
        form = TaskForm(request.POST or None)

        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            all_tasks = Task.objects.all
            messages.success (request, ('Task has been successfully added!'))
            return redirect('home') 

    else:
        form = TaskForm()

    return render(request, "add.html",{'form':form})  


def edit(request, task_id):
    task = get_object_or_404(Task, pk=task_id)

    if task.user != request.user:
        messages.error(request, "You do not have permission to edit this task.")
        return redirect('home')

    if request.method == 'POST':
        form = EditTaskForm(request.POST, instance=task)

        if form.is_valid():
            form.save()
            messages.success(request, "Task has been successfully updated.")
            return redirect('home')
    else:
        form = EditTaskForm(instance=task)

    context = {
        'form': form,
        'task': task,
    }
    return render(request, 'edit.html', context)


def delete(request, task_id):
    task = Task.objects.get(pk=task_id)
    task.delete()
    messages.success (request, ('Task has been deleted!'))
    return redirect(home)


def register(request):

    if request.method == 'POST':
        form = UserCreationForm(request.POST or None)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'{username}, your account has been successfully created!')
            return redirect (home)
        else:
            form = UserCreationForm(request.POST)
            return render (request, 'register.html', {'form':form})
    else:
        form = UserCreationForm()
        return render (request, 'register.html', {'form':form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'You have logged in successfully {user.username}!')
                return redirect('home')
            else:
                messages.error(request, 'Invalid username or password')
        else:
            messages.error(request, 'Invalid form input')
    else:
        form = LoginForm()
    return render (request, 'login.html', {'form':form})


def logout_view(request):
    logout(request)
    messages.success(request, f'You have logged out successfully!')
    return redirect('login_view')


