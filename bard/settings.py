import os

from urllib.parse import urlparse
from flask_babel import lazy_gettext
from datetime import timedelta

APP_DIR = os.path.abspath(os.path.dirname(__file__))

# GENERAL INSTANCE INFORMATION

APP_TITLE = os.getenv("DAKOBED_APP_TITLE", "Dakobed Bard")
APP_LOGO = os.getenv("DAKOBED_LOGO","/static/logo.png")







DEBUG = bool(os.getenv("DAKOBED_DEBUG", True))
# Profile requests
PROFILE = bool(os.getenv("DAKOBED_PROFILE", False))

# CORS_ORIGINS = os.getenv.to_list("DAKOBED_CORS_ORIGINS", ["*"], separator="|")

###############################################################################
# Database and search index

#DATABASE_URI = env.get("DAKOBED_DATABASE_URI")

DATABASE_URI = 'postgresql://bard:bard@postgres:5432/bard'
SQLALCHEMY_TRACK_MODIFICATIONS = False
ALEMBIC_DIR = os.path.join(APP_DIR, "migrate")

ELASTICSEARCH_URL = os.getenv("DAKOBED_ELASTIC_URI","http://localhost:9200")
ELASTICSEARCH_TIMEOUT = int(os.getenv("ELASTICSEARCH_TIMEOUT", 30))


### Cache Settings


REDIS_URL = "redis://redis:6379/0"



