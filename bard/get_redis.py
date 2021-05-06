import logging
from redis import ConnectionPool, BusyLoadingError, Redis
from fakeredis import FakeRedis
import time
import random
import json

from bard import service_settings
from bard.util import service_retries, backoff

log = logging.getLogger(__name__)


def get_redis():
    if service_settings.REDIS_URL is None:
        return get_fakeredis()
    conn = Redis(connection_pool=get_redis_pool(), decode_responses=True)


def make_key(*criteria):
    """Make a string key out of many criteria """
    parts = []
    for criterion in criteria:
        if criterion is None:
            continue
        criterion = str(criterion)
        criterion = criterion.replace(":", "#")
        parts.append(criterion)
    return ":".join(parts)


def get_redis_pool():
    if not hasattr(service_settings, "_redis_pool"):
        pool = ConnectionPool.from_url(service_settings.REDIS_URL, decode_responses=True)
        service_settings._redis_pool = pool
        wait_for_redis(pool)
    return service_settings._redis_pool


def wait_for_redis(pool):
    """Wait for redis to load its data into memory on initial system bootup"""
    for attempt in service_retries():
        try:
            conn = Redis(connection_pool=pool, decode_responses=True)
            conn.ping()
        except BusyLoadingError:
            log.info("WAITING FOR REDIS TO LOAD")
            backoff(failures=attempt)
    raise RuntimeError("REDIS IS NOT READY")





def get_fakeredis():
    if not hasattr(service_settings, "_redis_fake"):
        service_settings._redis_fake = FakeRedis(decode_responses=True)
    return service_settings._redis_fake