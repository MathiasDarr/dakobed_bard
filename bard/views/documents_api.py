from flask import Blueprint, request
import logging


log = logging.getLogger(__name__)
blueprint = Blueprint("entities_api", __name__)

@blueprint.route("/api/2/documents", methods=["GET"])
def get_documents():
    """

    :return:
    """
    return "Documents API"

@blueprint.route("/api/2/documents", methods=["POST"])
def post_document():


    return
