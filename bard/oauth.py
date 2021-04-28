import logging
from authlib.jose import JsonWebKey, JsonWebToken
from authlib.integrations.flask_client import OAuth

from bard import settings


oauth = OAuth()
log = logging.getLogger(__name__)

if settings.OAUTH:
    log.info("OAUTH IS ENABLED")
else:
    log.info("OAUTH IS DISABLED")


def configure_oath(app):
    if settings.OAUTH:
        log.info("OAUTH IS ENABLED")
    else:
        log.info("OAUTH IS DISABLED")

