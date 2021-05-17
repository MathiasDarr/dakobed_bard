import json
from datetime import datetime, date
from typing import Sequence, Generator, Any, Set, List, Iterable
from collections.abc import Mapping
import logging
import random
import time
from elasticsearch import Transport
from typing import Any, Optional
from decimal import Decimal


log = logging.getLogger(__name__)

DEFAULT_ENCODING = 'utf-8'


BOOL_TRUEISH  = ["1", "yes", "y", "t", "true", "on","enabled"]


def as_bool(value, default):
    if isinstance(value, bool):
        return value
    if value is None:
        return default
    value = str(value).strip().lower()
    if not len(value):
        return default
    return value in BOOL_TRUEISH


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


def unique_list(lst: Sequence) -> List:
    uniq = []
    for item in lst:
        if item not in uniq:
            uniq.append(item)
    return uniq


def first(lst: Sequence) -> Any:
    """
    Return the first non null element in the list if None
    """
    pass





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


class LoggingTransport(Transport):
    def __init__(self, *args, **kwargs):
        super(LoggingTransport, self).__init__(*args, **kwargs)

    def perform_request(self, method, url, headers=None, params=None, body=None):
        result = super(LoggingTransport, self).perform_request(
            method, url, headers, params, body
        )
        payload = {
            "es_req_method": method,
            "es_url": url,
            "es_req_params": params,
            "es_req_body": body,
            "took": hasattr(result, "get") and result.get("took")
        }
        log.warning("Performed ES request", **payload)
        return result

