#music/models.py
from django.db import models

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    youtube_url = models.URLField()
    thumbnail = models.URLField()
    video_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    file_path = models.CharField(max_length=500, default='')  # Thêm default=''


    def __str__(self):
        return self.title
    