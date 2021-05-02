import logging
from urllib.parse import urlencode
from bard.oauth import oauth
from flask import Blueprint, redirect, session, request
from authlib.common.errors import AuthlibBaseError
from werkzeug.exceptions import Unauthorized, BadRequest

from bard import settings
from bard.core import db, url_for, cache
from bard.authz import Authz
from bard.oauth import oauth, handle_oauth
from bard.models import Role
from bard.logic.util import ui_url
from bard.logic.roles import update_role
from bard.views.util import get_url_path, require, jsonify



log = logging.getLogger(__name__)
blueprint = Blueprint("sessions_api", __name__)


def _oauth_session(token):
    return cache.key("oauth-sess", token)


def _token_session(token):
    return cache.key("oauth-id-tok", token)


@blueprint.route("/api/2/sessions/login", methods=["POST"])
def password_login():
    """
    Provides email and password authentication
    """

    # require(settings.PASSWORD_LOGIN)
    request_data = request.get_json()
    email = request_data.get('email')
    password = request_data.get('password')
    log.warning("THE REQUEST DATA LOOKS LIKE {}".format(request_data))

    require(settings.PASSWORD_LOGIN)
    data = request.get_json()
    role = Role.login(data.get("email"), data.get("password"))

    #log.warning("LOGGING IN FROM THE SESSIONS API: {}".format(role.email))

    if role is None:
        raise BadRequest("Invalid user or password")
    #
    role.touch()
    db.session.commit()
    # update_role(role)
    authz = Authz.from_role(role)
    return jsonify({"status": "ok", "token": authz.to_token()})
    #return jsonify(role.to_dict())

@blueprint.route("/api/2/sessions/oauth")
def oauth_init():
    require(settings.PASSWORD_LOGIN)
    url = url_for(".oauth_callback")
    state = oauth.provider.create_authorization_url(url)
    state["next_url"] = request.args.get("next", request.referrer)
    state["redirect_uri"] = url
    cache.set_complex(_oauth_session(state.get("state")), state, expires=3600)
    return redirect(state["url"])


@blueprint.route("/api/2/sessions/callback")
def oauth_callback():
    require(settings.OAUTH)
    err = Unauthorized("Authentication has failed.")
    state = cache.get_complex(_oauth_session(request.args.get("state")))
    if state is None:
        raise err

    try:
        oauth.provider.framework.set_session_data(request, "state", state.get("state"))
        uri = state.get("redirect_uri")
        oauth_token = oauth.provider.authorize_access_token(redirect_uri=uri)
    except AuthlibBaseError as err:
        log.warning("Failed OAuth: %r", err)
        raise err

    if oauth_token is None or isinstance(oauth_token, AuthlibBaseError):
        log.warning("Failed OAuth: %r", oauth_token)
        raise err

    role = handle_oauth(oauth.provider, oauth_token)
    if role is None:
        raise err

    # Determine session duration based on OAuth settings
    expire = oauth_token.get("expires_in", Authz.EXPIRE)
    expire = oauth_token.get("refresh_expires_in", expire)

    db.session.commit()
    update_role(role)
    log.debug("Logged in: %r", role)
    request.authz = Authz.from_role(role, expire=expire)
    token = request.authz.to_token()

    id_token = oauth_token.get("id_token")
    if id_token is not None:
        cache.set(_token_session(token), id_token, expires=expire)

    next_path = get_url_path(state.get("next_url"))
    next_url = ui_url("oauth", next=next_path)
    next_url = "%s#token=%s" % (next_url, token)
    session.clear()
    return redirect(next_url)


@blueprint.route("/api9/2/sessions/logout", methods=["POST"])
def logout():
    """Destroy the current authz session (state)"""
    request.rate_limit = None
    redirect_url = settings.APP_UI_URL
    if settings.OAUTH:
        metadata = oauth.provider.load_server_metadata()
        logout_endpoint = metadata.get("end_session_endpoint")
        if logout_endpoint is not None:
            query = {
                "post_logout_redirect_uri": redirect_url,
                "id_token_hint": cache.get(_token_session(request.authz.token_id))
            }
            redirect_url = logout_endpoint + "?" + urlencode(query)
    request.authz.destroy()
    return jsonify({"redirect": redirect_url})