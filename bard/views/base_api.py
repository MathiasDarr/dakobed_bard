import logging
from flask import Blueprint, request, current_app
from bard import __version__
from bard.core import settings
from bard.views.util import jsonify


blueprint = Blueprint("base_api",__name__)
log = logging.getLogger(__name__)

def _metadata_locale():

    app_logo = settings.APP_LOGO

    return {
        "status":"ok",
        "app": {
            "title": settings.APP_TITLE,
            "version": __version__,
            "logo": app_logo
        }
    }


@blueprint.route("/api/2/statistics")
def statistics():
    """
    Get a summary of the data accessible to a user

    """
    data = {'trip_reports': [], "schemata": []}
    return jsonify(data)



@blueprint.route("/api/2/metadata")
def metadata():
    request.rate_limit = None
    data = _metadata_locale()
    return jsonify(data)



