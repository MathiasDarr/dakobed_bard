from flask import Response, request, render_template
from werkzeug.urls import url_parse
from werkzeug.exceptions import BadRequest, NotFound, Forbidden
import string
import logging

from bard.util import JSONEncoder
from bard.authz import Authz
from bard.models import Collection


log = logging.getLogger(__name__)
CALLBACK_VALID = string.ascii_letters + string.digits + "_"


def require(*predicates):
    """Check if a user is allowed a set of predicates."""
    for predicate in predicates:
        if not predicate:
            raise Forbidden("Sorry, you're not permitted to do this")


def validate(data, schema):
    """Validate the data inside a request against a schema"""


def obj_or_404(obj):
    """Raise a 404 error if the given object is None"""
    if obj is None:
        raise NotFound()
    return obj


def clean_objects(data):
    """Remove unset values from the response to save from bandwidth"""
    pass


def get_session_id():
    role_id = str(request.authz.id) or "anonymous"
    session_id = str(request._session_id)
    return "%s:%s" % (role_id, session_id)


def get_db_collection(collection_id, action=Authz.READ):
    collection = obj_or_404(Collection.by_id(collection_id))
    # require(request.authz.can(collection.id, action))
    return collection


def get_url_path(url):
    try:
        return url_parse(url).replace(netloc="", scheme="")
    except Exception:
        return "/"


def jsonify(obj, status=200, headers=None, encoder=JSONEncoder):
    """Serialize to JSON and also dump from the given schema."""
    data = encoder().encode(obj)
    mimetype = "application/json"
    if "callback" in request.args:
        cb = request.args.get("callback")
        cb = "".join((c for c in cb if c in CALLBACK_VALID))
        data = "%s && %s(%s)" % (cb, cb, data)
        # mime cf. https://stackoverflow.com/questions/24528211/
        mimetype = "application/javascript"
    return Response(data, headers=headers, status=status, mimetype=mimetype)
