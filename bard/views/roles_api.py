import logging
from flask import Blueprint, request

from bard.core import db
from bard.models import Role

blueprint = Blueprint("roles_api", __name__)
log = logging.getLogger(__name__)


@blueprint.route("/api/2/roles",methods=["POST"])
def create_role():
    Role.load_or_create()