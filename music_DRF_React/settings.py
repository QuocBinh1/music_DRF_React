# settings.py
import dj_database_url

from pathlib import Path
import os
import sys
import dj_database_url




DEBUG = os.getenv('DEBUG', 'False') == 'True'



# ⚙️ Tự động dùng DATABASE_URL nếu có (trên Render)
DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv('DATABASE_URL'),  # Render sẽ cấp sẵn biến này
        conn_max_age=600,
    )
}

# 🔁 Khi chạy local (chưa có DATABASE_URL), dùng cấu hình PostgreSQL local
if not os.getenv('DATABASE_URL'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'music',
            'USER': 'postgres',
            'PASSWORD': 'Anhbinhpzo11',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }

SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback-secret-key-for-local-dev')


ALLOWED_HOSTS = [
    'music-backend-k82o.onrender.com',
    '.onrender.com',  # Cho phép mọi service trên Render
    'localhost',
    '127.0.0.1',
]




YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "AIzaSyD_uhl8JT_N3qKC8Xi1VfPBYl8wOMEei3M")



CORS_ALLOWED_ORIGINS = [
    "https://nhacnhac-drab.vercel.app",
    "http://localhost:5173",  # Địa chỉ frontend React
]

# nơi Django biết file cấu hình URL chính
ROOT_URLCONF = 'music_DRF_React.urls'

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
BASE_DIR = Path(__file__).resolve().parent.parent

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
