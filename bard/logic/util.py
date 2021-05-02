import jwt
from datetime import datetime, timedelta
from werkzeug.urls import url_join


from bard.url_normalizer import query_string

from bard.core import settings, url_for

def ui_url(resource, id=None, _relative=False, **query):
    """Make a UI link"""
    if id is not None:
        resource = "%s/%s" % (resource, id)
    url = "/" if _relative else settings.APP_UI_URL
    url = url_for(url, resource)
    return url + query_string(list(query.items()))

def collection_url(collection_id = None, ** query):
    return ui_url("datasets", id = collection_id, **query)

def entityset_url(entityset_id, **query):
    return ui_url("entities", id=entityset_id, **query)

def entity_url(entity_id=None, **query):
    return ui_url("entities", id=entity_id, **query)