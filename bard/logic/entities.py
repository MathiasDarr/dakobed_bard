import logging

from bard.models import Entity
from bard.core import db, cache
from dakobed_schemas.types import registry
from dakobed_schemas import model
from dakobed_schemas.exc import InvalidData


log = logging.getLogger(__name__)


def upsert_entity(data, collection):
    """
    Create or update an entity in the database.  =
    """
    entity = None
    # entity = Entity.by_id(entity_id)
    Entity.create(data, collection)

    db.session.commit()
    # entity = None
    # if entity is None:
    #     entity = Entity.create(collection)
    # db.session.commit()

def validate_entity(data):
    schema = model.get(data.get("schem"))
    if schema is None:
        raise InvalidData("No schema on entity")
    """
    This isn't strictly required because the proxy will contain those values 
    """
    schema.validate(data)