import os
from servicelayer import env

from urllib.parse import urlparse
from flask_babel import lazy_gettext
from datetime import timedelta

APP_DIR = os.path.abspath(os.path.dirname(__file__))

DEBUG = env.to_bool("DAKOBED_DEBUG", True)
# Profile requests
PROFILE = env.to_bool("DAKOBED_PROFILE", False)

CORS_ORIGINS = env.to_list("DAKOBED_CORS_ORIGINS", ["*"], separator="|")

###############################################################################
# Database and search index

#DATABASE_URI = env.get("DAKOBED_DATABASE_URI")

DATABASE_URI = 'postgresql://bard:bard@postgres:5432/bard'

SQLALCHEMY_TRACK_MODIFICATIONS = False
ALEMBIC_DIR = os.path.join(APP_DIR, "migrate")
