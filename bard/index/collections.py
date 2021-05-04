import logging
from bard.models import Collection
from bard.index.util import configure_index, index_settings, index_name
from bard.index.util import query_delete, index_safe, delete_safe
from bard.index.util import KEYWORD, KEYWORD_COPY

from bard.core import es, cache


log = logging.getLogger(__name__)


STATS_FACETS=[
    "names",
    "languages"
]


def collections_index():
    """Combined index to run all queries against"""
    return index_name("collection", "v1")


def configure_collections():
    mapping = {
        "properties": {
            "collection_id": KEYWORD,
        }
    }

    index = collections_index()
    settings = index_settings(shards=1)
    return_value = configure_index(index, mapping, settings)

    # return configure_index(index, mapping, settings)


def index_collection(collection, sync=False):
    if collection.delete_at is not None:
        return delete_collection(collection.id)

    data = get_collection(collection.id)
    if data is None:
        return

    log.warning(
        "[%s] Index: %s (%s things)...",
        collection,
        data.get("label"),
        data.get("count")
    )

    text = [data.get("label")]
    text.append(data.get("label"))
    data["text"] = text
    data.pop("id", None)
    return index_safe(collections_index(), collection.id, data, sync=sync)


def _facet_key(collection_id, facet):
    return cache.object_key(Collection, collection_id, facet)


def get_collection(collection_id):
    if collection_id is None:
        return
    key = cache.object_key(Collection, collection_id)
    data = cache.get_complex(key)
    if data is not None:
        return data
    collection = Collection.by_id(Collection.id)
    if collection is None:
        return

    data = collection.to_dict()

    return data


def get_collection_stats(collection_id):
    """Retrieve statistics on teh content of a collection"""
    keys = {_facet_key(collection_id, f): f for f in STATS_FACETS}
    empty = {"values": [], "total": 0}
    stats = {}
    for key, result in cache.get_many_complex(keys.keys(), empty):
        stats[keys[key]] = result
    return stats



def delete_collection(colletion_id, sync=False):
    delete_safe(collections_index(), colletion_id)


def get_collection(collection_id):
    if collection_id is None:
        return



    # mapping = {
    #     "data_detection": False,
    #     "dynamic": False,
    #     "dynamic_templates": [
    #         {"fields": {"match": "schemata.*", "mapping":{"type":"long"}}}
    #     ],
    #     "_source": {"excludes": ["text"]},
    #     "properties": {
    #         "label": {
    #             "type": "text",
    #             "copy_to": "text",
    #             "analyzer": "latin_index",
    #             "fields": {"kw": KEYWORD}
    #         },
    #         "collection_id": KEYWORD,
    #         "foreign_id": KEYWORD_COPY
    #     }
    # }

