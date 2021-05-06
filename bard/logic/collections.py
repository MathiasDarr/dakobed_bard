import logging
from datetime import datetime

from bard.models.collection import Collection
from bard.core import db, cache
from bard.authz import Authz
from bard.index import collections as index

log = logging.getLogger(__name__)

def create_collection(data):
    now = datetime.utcnow()
    collection = Collection.create(data, created_at=now)
    # collection.id = 7
    # db.session.add(collection)
    # log.info("*******************************************")
    # log.info(db.session)
    db.session.commit()
    # log.info("dfadfa")


def update_collection(collection, sync=False):
    Authz.flush()
    refresh_collection(collection.id)
    return index.index_collection(collection, sync=sync)


def refresh_collection(collection_id):
    cache.kv.delete(
        cache.object_key(Collection, collection_id),
        cache.object_key(Collection, collection_id, "stats")
    )


def delete_collection(collection, keep_metadata=False, sync=False):
    log.warning("DFAAAAAAAAAAAAAAAAAAAAAA")
    deleted_at = collection.deleted_at or datetime.utcnow()
    if not keep_metadata:
        log.warning("am i getting deleted..")
        collection.delete(deleted_at=deleted_at)
    else:
        log.warning("WHHHHYYY")
    db.session.commit()
    if not keep_metadata:
        index.delete_collection(collection.id, sync=True)
    Authz.flush()
    refresh_collection(collection.id)


def upgrade_collections():
    for collection in Collection.all(deleted=True):
        print("I SEE A COLLECTION")
        if collection.deleted_at is not None:
            delete_collection(collection, keep_metadata=True, sync=True)
        else:
            pass


