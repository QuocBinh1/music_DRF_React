
#DRF/urls.py
from django.contrib import admin
from django.urls import path , include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static



router = DefaultRouter()
# router.register(r'songs', SongViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('music.urls'))
   
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
