from flask import Blueprint, request
from bard.core import db

blueprint = Blueprint("collections_api", __name__)

@blueprint.route("/api/2/collections", methods=["GET"])
def index():
    return "first route"

