import json
from datetime import datetime, date
from typing import Sequence
from collections.abc import Mapping
import logging
import random
import time

log = logging.getLogger(__name__)


def backoff(failures=0):
    """Implement a random growing delary between external service retries """
    sleep = max(1, failures -1) + random.random()
    log.debug("Back-off: %.2fs", sleep)
    time.sleep(sleep)


def service_retries():
    return range(30)


def is_mapping(obj):
    return isinstance(obj, Mapping)


def ensure_dict(obj):
    if is_mapping(obj) or hasattr(obj, "items"):
        return dict(obj.items())
    return {}


def is_sequence(obj):
    return isinstance(obj, Sequence) and not isinstance(obj, (str, bytes))


def is_listish(obj):
    if isinstance(obj, (list, tuple, set)):
        return True
    return is_sequence(obj)


def ensure_list(obj):
    if obj is None:
        return []
    if not is_listish(obj):
        return [obj]
    return [o for o in obj]



class JSONEncoder(json.JSONEncoder):
    """This encoder will serialize all entities that have a to_dict
    method by calling that method and serializing the result."""

    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, bytes):
            return obj.decode("utf-8")
        if isinstance(obj, set):
            return [o for o in obj]
        if hasattr(obj, "to_dict"):
            return obj.to_dict()
        return json.JSONEncoder.default(self, obj)

