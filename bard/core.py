import logging
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from elasticsearch import Elasticsearch, TransportError
from werkzeug.local import LocalProxy
from flask_cors import CORS
from urllib.parse import urljoin, urlencode
from flask import url_for as flask_url_for

from bard import settings
from bard.oauth import configure_oath
from bard.cache import Cache
from bard.get_redis import get_redis
from bard.util import service_retries, backoff, LoggingTransport
from bard import service_settings
from bard.servicelayer.archive import init_archive


NONE = "'none'"
log = logging.getLogger(__name__)
db = SQLAlchemy()
migrate = Migrate()


def create_app(config={}):

    app = Flask("bard")
    app.config.from_object(settings)
    app.config.update(config)

    if "postgres" not in settings.DATABASE_URI:
        raise RuntimeError("bard database must be PostgreSQL!")

    app.config.update(
        {
            "SQLALCHEMY_DATABASE_URI": settings.DATABASE_URI,
            "FLASK_SKIP_DOTENV": True,
            "FLASK_DEBUG": True,
            "PROFILE": settings.PROFILE,
        }
    )
    migrate.init_app(app, db, directory=settings.ALEMBIC_DIR)
    configure_oath(app)
    db.init_app(app)

    CORS(
        app,
        resources=r"/api/*",
        origins="*",
        supports_credentials=True,
    )

    from bard.views import mount_app_blueprints

    mount_app_blueprints(app)
    return app


@migrate.configure
def configure_alembic(config):
    config.set_main_option("sqlalchemy.url", settings.DATABASE_URI)
    return config


def get_es():
    # url = settings.ELASTICSEARCH_URL
    url = "http://elasticsearch:9200"
    timeout = settings.ELASTICSEARCH_TIMEOUT
    log.warning("ADFAIDFDAFAFDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    for attempt in service_retries():
        try:
            if not hasattr(settings, "_es_instance"):
                if service_settings.LOG_FORMAT == "JSON":
                    es = Elasticsearch(
                        url, transport_class=LoggingTransport, timeout=timeout
                    )
                    log.info("DFDFAAAAAAAAAA")

                else:
                    log.info("DFDFA")
                    es = Elasticsearch(url, timeout=timeout)
                es.info()
                settings._es_instance = es
            return settings._es_instance
        except TransportError as exc:
            log.warning("ElasticSearch error: %s", exc.error)
            backoff(failures=attempt)
        raise RuntimeError("Could not connect to ElasticSearch")



    # es = Elasticsearch(url, timeout = timeout)
    # es.info()
    # return es


def get_archive():
    if not hasattr(settings, "_archive"):
        settings._archive = init_archive()
    return settings._archive


def get_cache():
    if not hasattr(settings, "_cache") or settings._cache is None:
        settings._cache = Cache(get_redis(), prefix=settings.APP_NAME)
    return settings._cache


es = LocalProxy(get_es)
kv = LocalProxy(get_redis)
cache = LocalProxy(get_cache)
# archive = LocalProxy(get_archive())

def url_for(*a, **kw):
    """Overwrite Flask url_for to force external paths"""
    try:
        kw["_external"] = False
        query = kw.pop("_query", None)
        relative = kw.pop("_relative", False)
        path = flask_url_for(*a, **kw)
        return url_external(path, query, relative=relative)
    except RuntimeError:
        return None


def url_external(path, query, relative=False):
    """Generate external URLs with HTTPS (if configured)."""
    if query is not None:
        path = "%s?%s" % (path, urlencode(query))
    if relative:
        return path
    return urljoin(settings.APP_UI_URL, path)



