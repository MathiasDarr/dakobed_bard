from flask import Blueprint, request
import logging


log = logging.getLogger(__name__)
blueprint = Blueprint("upload_api", __name__)


# @blueprint.route("/<int:collection_id>/ingest", methods=["POST", "PUT"])
@blueprint.route("/ingest", methods=["POST", "PUT"])
def ingest_upload(collection_id=None):
    """
    Upload a document to a collection
    """

    authz_ = request.authz
    authz_write = request.authz.WRITE
    log.info("AUTHZ: {}".format(authz_))
    log.info("AUTHZ WRITE : {}".format(authz_write))

    return "adf"