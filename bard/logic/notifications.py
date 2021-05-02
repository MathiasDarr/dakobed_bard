import logging
from datetime import datetime, timedelta

from bard.core import cache, es, settings
from bard.authz import Authz
from bard.models import Collection, Role
from bard.logic.util import (
    collection_url,
    ui_url
)

log = logging.getLogger(__name__)
GLOBAL = "Global"


def channel_tag(obj, clazz=None):
    clazz = clazz or type(obj)
    if clazz == str:
        return obj


def get_role_channels(role):
    """
    Generate the set of notification channels that the current user4 should listen to
    """

    key = cache.object_key(Role, role.id, "channels")
    channels = cache.get_list(key)
    if len(channels):
        return channels
    channels = [GLOBAL]
    if role.is_actor:
        authz = Authz.from_role(role)
        for role_id in authz.roles:
            channels.append(cha)