from flask import Blueprint, request, jsonify
import logging
from bard.logic.collections import create_collection, delete_collection
from bard.models.collection import Collection
from bard.search import CollectionsQuery
from bard.views.serializers import CollectionSerializer
from bard.views.util import get_db_collection
from bard.views.util import request, jsonify
from bard.logic.collections import query_collections
from bard.core import db
from bard.authz import Authz


log = logging.getLogger(__name__)

blueprint = Blueprint("collections_api", __name__)


def dump(obj):
    for attr in dir(obj):
        log.warning("obj.%s = %r" % (attr, getattr(obj, attr)))


@blueprint.route("/api/2/collections", methods=["GET"])
def index():
    """
    List of collections
    """
    # log.warning("THE COLLECTIONS INDEX API LOOKS LIKE ")
    # result = CollectionsQuery.handle(request)
    # log.warning("RESULT {}".format(result))

    return jsonify(query_collections())




@blueprint.route("/api/2/collections", methods=["POST", "PUT"])
def create():
    """
    ---
    post:
      summary: Create a collection
      description: Create a collection with the given metadata
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CollectionCreate'
      tags:
        - Collection
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Collection'
    """
    request_data = request.get_json()

    # summary = request_data['summary']
    label = request_data['label']

    # resp_dictionary = {'mylabel':label}


    #
    # log.info(str(request))
    # log.info(str(request_data))
    # log.info("YESS")

    # myModel = MyModel()
    # myModel.id = 1
    # myModel.username = "jesus"
    #
    # collection = Collection()
    # collection.id = 2
    # collection.label = "why"
    #
    # db.session.add(collection)
    # db.session.commit()
    #
    collection = create_collection(data=request_data)
    resp_dictionary = {
        "collection_id": collection.id,
        "label": collection.label
    }
    return jsonify(resp_dictionary)


@blueprint.route("/api/2/collections/<int:collection_id>", methods=["GET"])
def view(collection_id):
    cobj = get_db_collection(collection_id)
    label = cobj.label
    log.warning("THE COBJ LOOKS LIKE {}".format(label))
    # return "MADE THE CALL {}".format(label)
    data = {
        "id": cobj.id,
        "label": cobj.label
    }
    return CollectionSerializer.jsonify(cobj)


@blueprint.route("/api/2/collections/<int:collection_id>", methods=["DELETE"])
def delete(collection_id):
    """
    ---
    delete:
        summary: Delete a collection
    """
    log.warning("AAAAAAAAAAAADFFFFFFFFFFFF")
    collection = get_db_collection(collection_id, Authz.WRITE)
    keep_metadata = False
    sync = False
    delete_collection(collection, keep_metadata=keep_metadata, sync=sync)

    return jsonify({"status": "ok"})


