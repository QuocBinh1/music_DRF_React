# Generated by Django 5.1.7 on 2025-04-02 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('youtube_url', models.URLField()),
                ('thumbnail', models.URLField()),
                ('video_id', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('file_path', models.CharField(default='', max_length=500)),
            ],
        ),
    ]
