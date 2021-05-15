from bard.models import Entity
from bard.core import db, cache
import logging

log = logging.getLogger(__name__)


def upsert_entity(collection):
    """
    Create or update an entity
    """
    Entity.create()

    db.session.commit()
    # entity = None
    # if entity is None:
    #     entity = Entity.create(collection)
    # db.session.commit()