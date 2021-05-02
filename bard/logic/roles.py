import logging
from flask import render_template
from bard.core import db, settings, cache
from bard.models import Role, Permission
from bard.authz import Authz

log = logging.getLogger(__name__)


def get_role(role_id):
    if role_id is None:
        return
    key = cache.object_key(Role, role_id)
    data = cache.get_complex(key)
    if data is None:
        role = Role.by_id(role_id)
        if role is None:
            return
        data = role.to_dict()
        cache.set_complex(key, data, expires=cache.EXPIRE)
    return data


def create_system_roles():
    log.info("CREATING SYSTEM ROLES")
    Role.load_or_create(Role.SYSTEM_GUEST, Role.SYSTEM, "All visitors")
    Role.load_or_create(Role.SYSTEM_USER, Role.SYSTEM, "Logged in users")
    Role.load_cli_user()
    db.session.commit()


def create_user(email, name, password, is_admin=False):
    """Create a password-based user"""
    foregin_id = "password:{}".format(email)
    role = Role.load_or_create(
        foregin_id, Role.USER, name, email=email, is_admin=is_admin
    )
    if password is not None:
        role.set_password(password)
    db.session.add(role)
    db.session.commit()
    #update_role(role)
    return role


def update_role(role):
    refresh_role(role)
    get_role(role.id)


def update_roles():
    for role in Role.all(deleted=True):
        update_role(role)


def delete_role(role):
    """
    Fully delete a role from the database and transfer the ownership of documents and entities by it to the system user
    """
    fallback = Role.load_cli_user()

    def _del(cls, col):
        pq = db.session.query(cls)
        pq = pq.filter(col == role.id)

    def _repo(cls, col):
        pq = db.session.query(cls).filter(col == role.id)
        pq.update({col: fallback.id}, synchronize_session=False)

    _del(Permission, Permission.role_id)
    db.session.delete(role)
    db.session.commit()


def refresh_role(role, sync=False):
    Authz.flush_role(role)
    cache.kv.delete(
        cache.object_key(Role, role.id),
        cache.object_key(Role, role.id, "channels")
    )


def check_visible(role, authz):
    if role is None:
        return False
    if authz.can_read_role(role.id):
        return True
    return role.type == Role.USER