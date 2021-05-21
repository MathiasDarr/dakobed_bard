import json
import logging
import shutil
from flask import Blueprint, request
from tempfile import mkdtemp
from werkzeug.exceptions import BadRequest

from bard.views.util import get_db_collection
from bard.servicelayer.util import ensure_path
from bard.views.util import jsonify
from bard.models import Document
from dakobed_schemas.normality import stringify

from bard.core import db

log = logging.getLogger(__name__)
blueprint = Blueprint("ingest_api", __name__)


def _load_metadata():
    """
    Unpack the common, pre-defined metadata for all the uploaded files
    """
    log.warning("the request looks like {}".format(request))
    log.warning("BODY: %s", request.get_data())
    meta = {}
    foreign_id = stringify(meta.get("foreign_id"))
    log.warning("THE LENGTH OF REQUESTS.FILES {}".format(len(request.files)))
    if not len(request.files) and foreign_id is None:
        raise BadRequest(
            response=jsonify(
                {"status": "error", "message": "Directories need to have a foreign_id"},
                status=400
            )
        )
    return meta, foreign_id





@blueprint.route("/api/2/collections/<int:collection_id>/ingest", methods=["POST", "PUT"])
def ingest_upload(collection_id):
    """
    post:
        Upload a document to a collection
    """
    collection = get_db_collection(collection_id)

    # meta, foreign_id = _load_metadata()
    upload_dir = ensure_path(mkdtemp(prefix="bard.upload"))
    meta, foreign_id =_load_metadata()
    try:
        document = Document.save(
            collection=collection,
        )
        collection.touch()
        db.session.commit()
        return jsonify({"status": "ok", "id": document.id}, status=201)
    finally:
        shutil.rmtree(upload_dir)

    return "dfa"