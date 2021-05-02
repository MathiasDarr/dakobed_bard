import json
import logging
from werkzeug.exceptions import Unauthorized

from bard.core import db, settings, cache
from bard.models import Collection, Role
from bard.models.common import make_token

log = logging.getLogger(__name__)


class Authz(object):
    """
    Hold the authorization information for a user
    """

    READ = 'read'
    WRITE = 'write'
    ACCESS = 'authzca'
    TOKENS = 'authztk'
    EXPIRE = 42300

    def __init__(self, role_id, roles, is_admin=False, token_id=None, expire=None):
        self.id = role_id
        self.logged_in = role_id is not None
        self.roles = set(roles)
        self.is_admin = is_admin
        self.token_id = token_id
        self.expire = expire or self.EXPIRE
        self.session_write = not settings.MAINTENACE and self.logged_in
        self._collections = {}

    def collections(self, action):
        if self.is_admin:
            return [c for (c, ) in Collection.all_ids()]

        if action in self._collections:
            return self._collections.get(action)
        key = self.id or "anonymous"


    def can(self, collection, action):
        if action == self.WRITE and not self.session_write:
            return False
        if self.is_admin:
            return True

        if isinstance(collection, Collection):
            collection = collection.id
        try:
            collection = int(collection)
        except (TypeError, ValueError):
            return False
        return collection in self.collections(action)

    def can_read_role(self, role_id):
        if self.is_admin:
            return True
        return int(role_id) in self.roles

    def can_register(self):
        if self.logged_in or settings.MAINTENACE or not settings.PASSWORD_LOGIN:
            return False
        return True



    def destroy(self):
        if self.role is not None:
            self.flush_role(self.role)
        if self.token_id is not None:
            cache.delete(cache.key(self.TOKENS, self.token_id))

    @property
    def role(self):
        if not hasattr(self, "_role"):
            self._role = Role.by_id(self.id)
        return self._role

    @property
    def private_roles(self):
        if not self.logged_in:
            return set()
        return self.roles.difference(Role.public_roles())

    def to_token(self):
        if self.token_id is None:
            self.token_id = "%s.%s" % (self.id, make_token())
            key = cache.key(self.TOKENS, self.token_id)
            state = {
                "id": self.id,
                "roles": list(self.roles),
                "is_admin": self.is_admin
            }
        return self.token_id

    def __repr__(self):
        return "<Authz(%s)>" % self.id

    @classmethod
    def from_role(cls, role, expire=None):
        roles = set([Role.load_id(Role.SYSTEM_GUEST)])
        if role is None or not role.is_actor:
            return cls(None, roles)

        roles.add(role.id)
        roles.add(Role.load_id(Role.SYSTEM_USER))
        roles.update([g.id for g in role.roles])
        return cls(role.id, roles, is_admin=role.is_admin, expire=expire)



    @classmethod
    def from_token(cls, token_id):
        state_key = cache.key(cls.TOKENS, token_id)
        state = cache.get_complex(state_key)
        if state is None:
            raise Unauthorized()
        return cls(
            state.get("id"),
            state.get("roles"),
            is_admin=state.get("is_admin"),
            token_id=token_id
        )

    @classmethod
    def flush(cls):
        cache.kv.delete(cls.ACCESS)

    @classmethod
    def flush_role(cls, role):
        # Clear collections ACL cache
        cache.kv.hdel(cls.ACCESS, role.id)
        if role.is_blocked or role.deleted_at is not None:
            # End all user sessions
            prefix = cache.key(cls.TOKENS, "%s." % role.id)
            cache.flush(prefix=prefix)





