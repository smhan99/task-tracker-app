from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone

# Create your models here.

class Task(models.Model):
    TASK_STATUS_CHOICES = (
        ('in_progress', 'In Progress'),
        ('on_hold', 'On Hold'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='tasks')
    task = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=255, choices=TASK_STATUS_CHOICES, default='in progress')
    due_date = models.DateField(blank=False)
    created_date = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.due_date < timezone.now().date():
            raise ValidationError("Due date cannot be in the past.")

    def __str__(self):
        return self.task + ' | ' + str(self.status) 


