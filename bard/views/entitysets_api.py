import logging
from flask import Blueprint, request, redirect

from bard.core import db, url_for
from bard.logic.entitysets import create_entityset
from bard.models.collection import Collection


# from bard.models im

blueprint = Blueprint("entitysets_api", __name__)
log = logging.getLogger(__name__)

@blueprint.route("/api/2/entitysets", methods=["GET"])
def index():
    """
    Returns a list of entitysets
    """
    pass

@blueprint.route("/api/2/entitysets", methods=["POST", "PUT"])
def create():

    request_data = request.get_json()

    # summary = request_data['summary']
    collection_id = request_data['collection_id']
    label = request_data["label"]
    type = request_data["type"]


    collection = Collection.by_id(collection_id)
    entityset = create_entityset(collection, {"label": label, "type": type})
    db.session.commit()

    return "entity sets.."