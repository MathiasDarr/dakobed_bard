from flask import Response, request, render_template
from werkzeug.exceptions import BadRequest, NotFound
from bard.util import JSONEncoder
import string
import logging

log = logging.getLogger(__name__)
CALLBACK_VALID = string.ascii_letters + string.digits + "_"


def validate(data, schema):
    """Validate the data inside a request against a schema"""


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
