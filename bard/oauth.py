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
        oauth.provider = oauth.register(
            name=settings.OAUTH_HANDLER,
            client_id=settings.OAUTH_KEY,
            client_secret=settings.OAUTH_SECRET,
            client_kwarg={"scope":settings.OAUTH_SCOPE},
            server_metadta_url=settings.OAUTH_METADATA_URL
        )
        oauth.init_app(app)
        log.info("OAUTH IS ENABLED")
    else:
        log.info("OAUTH IS DISABLED")


def handle_oauth(provider, oauth_token):
    from bard.models import Role

    token = provider.parse_id_token(oauth_token)
    if token is None:
        return None
    name = token.get("name", token.get("given_name"))






