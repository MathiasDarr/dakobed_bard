import logging

from collections import defaultdict
from bard.core import cache
from bard.logic.roles import get_role



def queue(stub, clazz, key, schema=None):
    """
    Notify the resolve associated with 'stub' that the given object needs to be retrieved.  Multiple calls with the same
    object signature will be merged.
    """
    key = str(key)
    if key is None:
        return
    stub._rx_queue.add((clazz, key, schema))


def resolve(stub):
    cache_keys = {}
    for clazz, key, schema in stub._rx_queue:
        if (clazz, key) in stub._rx_cache:
            continue

