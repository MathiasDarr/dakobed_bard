from flask import Blueprint, request, jsonify
import logging
from bard.logic import collections
from bard.models.collection import MyModel, Collection

from bard.core import db


log = logging.getLogger(__name__)

blueprint = Blueprint("collections_api", __name__)

@blueprint.route("/api/2/collections", methods=["GET"])
def index():
    """
    List of collections
    """
    return "second route dfa dafa  "


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

    resp_dictionary = {'mylabel':label}
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
    collections.create_collection(data=request_data)

    return jsonify(resp_dictionary)