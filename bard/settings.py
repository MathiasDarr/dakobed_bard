import os
from urllib.parse import urlparse
from flask_babel import lazy_gettext
from datetime import timedelta

APP_DIR = os.path.abspath(os.path.dirname(__file__))

DEBUG = bool(os.getenv("DAKOBED_DEBUG", True))
# Profile requests
PROFILE = bool(os.getenv("DAKOBED_PROFILE", False))
# Propose HTTP caching to the user agents.
CACHE = bool(os.getenv("BARD_CACHE", not DEBUG))
# Puts the system into read-only mode and displays a warning
MAINTENACE = bool(os.getenv("BARD_MAINTENANCE", False))
# Unit test context
TESTING = False


# GENERAL INSTANCE INFORMATION

APP_TITLE = os.getenv("DAKOBED_APP_TITLE", "Dakobed Bard")
APP_NAME = os.getenv("BARD_APP_NAME", "bard")
APP_UI_URL = os.getenv("BARD_UI_URL","http://localhost:8080")
APP_FAVICON = os.getenv("BARD_FAVICON", "/static/favicon.png")
APP_LOGO = os.getenv("DAKOBED_LOGO","/static/logo.png")
APP_LOGO_AR = os.getenv("BARD_LOGO_AR", APP_LOGO)



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


SYSTEM_USER = os.getenv("BARD_SYSTEM_USER", "system:bard")

# OAUTH configuration

OAUTH = bool(os.getenv("BARD_OAUTH", False))

# HANDLER IS ONE OF THE KEYCLOAK, GOOGLE, COGNITO, AZURE
OAUTH_HANDLER = "oidc"
OAUTH_MIGRATE_SUB = bool(os.getenv("BARD_OAUTH_MIGRATE_SUB", False))
OAUTH_KEY = os.getenv("BARD_OAUTH_KEY")
OAUTH_SECRET = os.getenv("BARD_OAUTH_SECRET")
OAUTH_SCOPE = os.getenv("BARD_OAUTH_SCOPE","openid email profile")
OAUTH_METADATA_URL = os.getenv("BARD_OAUTH_METADATA_URL")
OAUTH_TOKEN_METHOD = os.getenv("BARD_OAUTH_TOKEN_METHOD","POST")
OAUTH_ADMIN_GROUP = os.getenv("BARD_OAUTH_ADMIN_GROUP","superuser")

# No authentication.  Everyone is admin
SINGLE_USER = bool(os.getenv("BARD_SINGLE_USER"))

# Disable password-based authenticaion for SSO settings
PASSWORD_LOGIN = bool(os.getenv("BARD_PASSWORD_LOGIN", not OAUTH))

ROLE_INACTIVE = int(os.getenv("BARD_ROLE_INACTIVE", 6 * 30))
ROLE_INACTIVE = timedelta(days=ROLE_INACTIVE)


# Content processing options
DEFAULT_LANGUAGE = os.getenv("BARD_DEFAULT_LANGUAGE", "en")

# Document processing pipeline
INGEST_PIPELINE = ["analyze"]


# Number of replicas to maintain, '2' means overall copies
INDEX_REPLICAS = int(os.getenv("BARD_INDEX_REPLICAS", 0))
INDEX_PREFIX = os.getenv("BARD_INDEX_PREFIX", APP_NAME)
INDEX_WRITE = os.getenv("BARD_INDEX_WRITE", "v1")
INDEX_READ =  [INDEX_WRITE]
