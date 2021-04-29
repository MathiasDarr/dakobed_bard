import time
import uuid
from flask import request, Response, Blueprint
from werkzeug.exceptions import TooManyRequests

from bard import __version__
from bard.core import settings
from bard.models import Role




class NotModified(Exception):
    """Converts to HTTP status 304."""
    pass

