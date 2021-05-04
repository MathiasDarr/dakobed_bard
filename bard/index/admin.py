import logging

from bard.core import es
from bard.index.collections import collections_index, configure_collections


log = logging.getLogger(__name__)


def upgrade_search():
    configure_collections()


def all_indexes():
    return ",".join(
        (
            collections_index()
        )
    )


def delete_index():
    es.indices.delete(index=all_indexes(), ignore=[404, 400])


def clear_index():
    es.delete_by_query(
        index=all_indexes(),
        body={"query":{"match_all": {}}},
        refresh=True,
        wait_for_completion=True,
        conflict="proceed",
        ignore=[404]
    )