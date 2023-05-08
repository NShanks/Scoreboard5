import os
import django

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gameInfo.settings')

# Initialize Django
django.setup()

# Import your models
from gameInfo.models import Game, Stats
