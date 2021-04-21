from flask import Blueprint, request
import logging


log = logging.getLogger(__name__)
blueprint = Blueprint("entities_api", __name__)

@blueprint.route("/api/2/entities",methods=["GET"])
def index():
    """

    :return:
    """
    return "Entities API"