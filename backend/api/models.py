from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Beat(models.Model):
    title = models.CharField(max_length=200)
    audio_file = models.FileField(upload_to='beats/')
    genre = models.CharField(max_length=100)
    bpm = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    beats = models.ManyToManyField(Beat)

    def __str__(self):
        return f"{self.user.username}'s Cart"
