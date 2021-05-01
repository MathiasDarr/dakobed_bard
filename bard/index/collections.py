import logging
from bard.index.util import index_name


log = logging.getLogger(__name__)


def collections_index():
    """Combined index to run all queries against"""
    return index_name("collection", "v1")

