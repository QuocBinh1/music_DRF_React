#music/views.py
import requests , os 
from rest_framework.response import Response 
from rest_framework import  status
from rest_framework.views import APIView

from music_DRF_React import settings
from .models import Song
from yt_dlp import YoutubeDL

MEDIA_SONGS_PATH = "downloads"

YOUTUBE_API_KEY = "AIzaSyD_uhl8JT_N3qKC8Xi1VfPBYl8wOMEei3M"

danh_sach_ten_bai_hat = "mikelodic" 
so_luong_bai_hat = 20

    
class SearchYouTubeView(APIView):
    """Tìm kiếm bài hát trên YouTube và trả về danh sách video liên quan."""
    
    def get(self, request):
        query = request.GET.get("q",danh_sach_ten_bai_hat)  
        max_results = request.GET.get("max_results", so_luong_bai_hat) 
        
        url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults={max_results}&q={query}&key={YOUTUBE_API_KEY}"
        response = requests.get(url)
        
        if response.status_code != 200:
            return Response({"error": "Không thể lấy dữ liệu từ YouTube"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = response.json()
        songs = []

        for item in data.get("items", []):
            video_id = item["id"]["videoId"]
            snippet = item["snippet"]

            songs.append({
                "title": snippet["title"],
                "artist": snippet["channelTitle"],
                "thumbnail": snippet["thumbnails"]["high"]["url"],
                "video_id": video_id,
                "youtube_url": f"https://www.youtube.com/watch?v={video_id}"
            })

        return Response({"message": "Thành công!", "data": songs}, status=status.HTTP_200_OK)    




class DownloadYouTubeToLocal(APIView):
    """Tải nhạc từ YouTube về thư mục downloads và lưu thông tin vào cơ sở dữ liệu."""
    
    def post(self, request):
        songs = request.data.get("songs", [])  # Danh sách các bài hát cần tải
        if not songs:
            return Response({"error": "Danh sách bài hát không được cung cấp"}, status=status.HTTP_400_BAD_REQUEST)

        download_path =settings.MEDIA_ROOT
        os.makedirs(download_path, exist_ok=True)  # Tạo thư mục nếu chưa tồn tại

        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(download_path, '%(id)s.%(ext)s'),  # Lưu file với video_id.mp3
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        downloaded_songs = []
        with YoutubeDL(ydl_opts) as ydl:
            for song in songs:
                try:
                    youtube_url = song.get("youtube_url")
                    if not youtube_url:
                        continue
                    info = ydl.extract_info(youtube_url, download=True)
                    video_id = info.get("id")
                    file_path = os.path.join(download_path, f"{video_id}.mp3")

                    # Lưu thông tin bài hát vào cơ sở dữ liệu
                    song_obj, created = Song.objects.get_or_create(
                        video_id=video_id,
                        defaults={
                            "title": info.get("title"),
                            "artist": info.get("uploader", "Unknown"),
                            "thumbnail": info.get("thumbnail"),
                            "youtube_url": youtube_url,
                            "file_path": file_path,
                        }
                    )

                    downloaded_songs.append({
                        "title": song_obj.title,
                        "artist": song_obj.artist,
                        "thumbnail": song_obj.thumbnail,
                        "video_id": song_obj.video_id,
                        "youtube_url": song_obj.youtube_url,
                        "file_path": song_obj.file_path,
                    })
                except Exception as e:
                    print(f"❌ Lỗi khi tải bài hát: {e}")

        return Response({"message": "Tải nhạc thành công!", "data": downloaded_songs}, status=status.HTTP_200_OK)


class GetAllSongs(APIView):
    """Trả về danh sách các bài hát từ cơ sở dữ liệu."""
    
    def get(self, request):
        songs = Song.objects.all()
        data = [
            {
                "title": song.title,
                "artist": song.artist,
                "thumbnail": song.thumbnail,
                "video_id": song.video_id,
                "youtube_url": song.youtube_url,
                "detail_url": request.build_absolute_uri(f"/api/songs/{song.video_id}/"),  # Thêm trường detail_url
                "play_url": request.build_absolute_uri(f"/media/{song.video_id}.mp3")  # Phát nhạc bằng video_id.mp3

            }
            for song in songs
        ]
        return Response({"message": "Thành công!", "data": data}, status=status.HTTP_200_OK)
class GetSongByVideoID(APIView):
    """Trả về thông tin chi tiết của bài hát dựa trên video_id."""
    
    def get(self, request, video_id):
        try:
            song = Song.objects.get(video_id=video_id)
            return Response({
                "title": song.title,
                "artist": song.artist,
                "thumbnail": song.thumbnail,
                "video_id": song.video_id,
                "youtube_url": song.youtube_url,
                "play_url": request.build_absolute_uri(f"/media/{video_id}.mp3")  # Phát nhạc bằng video_id.mp3

            }, status=status.HTTP_200_OK)
        except Song.DoesNotExist:
            return Response({"error": "Không tìm thấy bài hát với video_id này."}, status=status.HTTP_404_NOT_FOUND)