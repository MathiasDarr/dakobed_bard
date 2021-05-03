import logging
from bard.index.util import index_name
from bard.models import Collection
f

log = logging.getLogger(__name__)


def collections_index():
    """Combined index to run all queries against"""
    return index_name("collection", "v1")

def get_collection(collection_id):
    if collection_id is None:
        return
