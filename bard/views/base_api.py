import logging
from functools import lru_cache
from flask import Blueprint, request, current_app
from bard import __version__
from bard.core import settings, url_for
from bard.views.util import jsonify
import os


blueprint = Blueprint("base_api",__name__)
log = logging.getLogger(__name__)


@lru_cache(maxsize=None)
def _metadata_locale():

    #log.warning("THE settings.PASSWORD_LOGIN: {}".format(settings.PASSWORD_LOGIN))
    # log.warning("THE settings.PASSWORD_LOGIN: {}".format(settings.m))
    #log.warning("THE settings.PASSWORD_LOGIN: {}".format(settings.PASSWORD_LOGIN))


    password_login = True

    auth = {"oauth": settings.OAUTH}

    log.warning("THE OAUTH SETTINGS ARE {}".format(auth))
    log.warning("THE PASSWORD SETTINGS ARE {}".format(settings.PASSWORD_LOGIN))

    if password_login:
        log.warning("ADFA")
        auth["password_login_uri"] = url_for("sessions_api.password_login")
    else:
        log.warning("NIN")

    if password_login and not settings.MAINTENACE:
#        log.warning("PASSWORD LOGIN & not MAINTENANCE")
        auth['registration_uri'] = url_for("roles_api.create_code")
    else:
        pass
#        log.warning("noedf")

    if settings.OAUTH:
#        log.warning("OAUTH ACTIVATED")
        auth['oauth_uri'] = url_for("sessions_api.oauth_init")
    else:
        pass
        #log.warning("adfafafa")


    log.warning("AUTH: {}".format(auth))
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

