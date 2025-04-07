# settings.py
import dj_database_url

from pathlib import Path
import os
import sys
import dj_database_url




# DEBUG = True
DEBUG = os.getenv('DEBUG', 'False') == 'True'

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600,  # Kết nối tối đa 10 phút
    )
}



# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'music', # ten db
#         'USER': 'postgres',
#         'PASSWORD': 'Anhbinhpzo11',
#         'HOST': 'localhost',   # Thay đổi nếu cần thiết
#         'PORT': '5432',        # Thay đổi nếu cần thiết
#     }
# }





# Build paths inside the project like this: BASE_DIR / 'subdir'.




SECRET_KEY = 'django-insecure-$=1!_p6ymufin2g6+$dnfa(qa_=&ei%zpgv&^!k7p44%f3xz3o'



ALLOWED_HOSTS = [
    'music-backend-k82o.onrender.com',
    '.onrender.com',  # Cho phép mọi service trên Render
    'localhost',
    '127.0.0.1',
]


# Application definition
ROOT_URLCONF = 'music_DRF_React.urls'


YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "AIzaSyD_uhl8JT_N3qKC8Xi1VfPBYl8wOMEei3M")



CORS_ALLOWED_ORIGINS = [
    
    "https://nhacnhac-drab.vercel.app",
    "http://localhost:5173",  # Địa chỉ frontend React
]


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'music',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "Templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'music_DRF_React.wsgi.application'
MEDIA_URL = '/media/'

# ✅ Dùng thư mục tạm thời phù hợp với Render
# MEDIA_ROOT = os.path.join(BASE_DIR, 'downloads')
MEDIA_ROOT = '/tmp'



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
