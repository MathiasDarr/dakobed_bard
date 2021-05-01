import logging
from flask import Blueprint, request, current_app
from bard import __version__
from bard.core import settings, url_for
from bard.views.util import jsonify


blueprint = Blueprint("base_api",__name__)
log = logging.getLogger(__name__)

def _metadata_locale():
    auth = {"oauth": settings.OAUTH}
    if settings.PASSWORD_LOGIN:
        auth["password_login_uri"] = url_for("sessions")
    if settings.PASSWORD_LOGIN and not settings.MAINTENACE:
        auth['registration_uri'] = url_for("roles_api.create_code")
    if settings.OAUTH:
        auth['oauth_uri'] = url_for("sessions_api.oauth_init")

    app_logo = settings.APP_LOGO

    return {
        "status": "ok",
        "app": {
            "title": settings.APP_TITLE,
            "version": __version__,
            "ui_uri": settings.APP_UI_URL,
            "logo": app_logo,
            "favicon": settings.APP_FAVICON,
        },
        "token": None,
        "auth": auth

    }


@blueprint.route("/api/2/metadata")
def metadata():
    """
    Get operation metadata for the frontend
    """
    request.rate_limit = None
    data = _metadata_locale()



    return jsonify(data)


@blueprint.route("/api/2/statistics")
def statistics():
    """
    Get a summary of the data accessible to a user

    """
    data = {'trip_reports': [], "schemata": []}
    return jsonify(data)


@blueprint.app_errorhandler(400)
def handle_bad_request(err):
    if err.response is not None and err.response.is_json:
        return err.response
    return jsonify({"status":"error", "message": "YOU DONE FUCKED UDVA"}, status=400)

