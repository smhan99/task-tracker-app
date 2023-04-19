from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["task","description","due_date"]

        widgets = {
            'due_date': forms.widgets.DateTimeInput(attrs={'type': 'date'}),
        }


class EditTaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["task","description","status","due_date"]

        widgets = {
            'due_date': forms.widgets.DateTimeInput(attrs={'type': 'date'}),
        }

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)