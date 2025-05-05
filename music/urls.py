#music/urls.py
from django.urls import path
from .views import SearchYouTubeView , GetAllSongs 
from .views import GetSongByVideoID ,StreamYouTubeAudioView  
# from .views import DownloadYouTubeToLocal
urlpatterns = [
    path('search/', SearchYouTubeView.as_view(), name='search_youtube'),
    path('songs/', GetAllSongs.as_view(), name='get_all_songs'),
    path('songs/<str:video_id>/', GetSongByVideoID.as_view(), name='get_song_by_video_id'),
    # path('download/', DownloadYouTubeToLocal.as_view(), name='download_youtube'),
    path('stream/<str:video_id>/', StreamYouTubeAudioView.as_view(), name='stream_audio'),


]
