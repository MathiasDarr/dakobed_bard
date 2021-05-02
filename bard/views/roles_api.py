import logging
from flask import Blueprint, request

from bard.core import db
from bard.models import Role
from bard.views.util import require, jsonify, obj_or_404
from bard.logic.roles import update_role, create_user
from bard.authz import Authz


blueprint = Blueprint("roles_api", __name__)
log = logging.getLogger(__name__)


@blueprint.route("/api/2/roles/code", methods=["POST"])
def create_code():
    # require(request.authz.can_register())
    data = request.get_json()
    return jsonify(
        {"status": "ok", "message": "To proceed, check your email"}
    )


@blueprint.route("/api/2/roles", methods=["POST"])
def create():
    data = request.get_json()
    email = "mddarr@gmail.com"
    role = Role.by_email(email)

    if role is not None:
        return jsonify(
            {"status": "error", "message": "Email is already registered"},
            status=409
        )
    role = create_user(email, data.get("name"), data.get("password"))

    request.authz = Authz.from_role(role)

    return jsonify({"status": "ok"})


@blueprint.route("/api/2/roles/<int:id>", methods=["GET"])
def view(id):
    """Retrieve role details"""

    role = obj_or_404(Role.by_id(id))
    data = role.to_dict()
    return jsonify(data)


@blueprint.route("/api/2/roles/<int:id>", methods=["POST", "PUT"])
def update(id):
    role = obj_or_404(Role.by_id(id))
    data = request.get_json()
    role.update(data)
    db.session.add(role)
    db.session.commit()
    update_role(role)
    return jsonify(data)
