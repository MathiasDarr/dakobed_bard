import logging

from bard.core import cache
from bard.logic.entities import upsert_entity
from bard.models import EntitySet

log = logging.getLogger(__name__)


def get_entityset(entityset_id):
    return EntitySet.by_id(entityset_id)


def create_entityset(collection, data):
    """
    Create an entity set.
    """

    old_to_new_id_map = {}
    entity_ids = []
    for entity in data.pop("entities", []):
        old_id = entity.get("id")
        new_id = upsert_entity(entity, collection)
        old_to_new_id_map[old_id] = new_id
        entity_ids.append(new_id)

    entityset = EntitySet.create(data, collection)
    return entityset