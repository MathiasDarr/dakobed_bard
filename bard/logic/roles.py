import logging
from flask import render_template
from bard.core import db
from bard.models import Role


log = logging.getLogger(__name__)


def create_system_roles():
    log.info("CREATING SYSTEM ROLES")
    Role.load_or_create(Role.SYSTEM_GUEST, Role.SYSTEM, "All visitors")
    Role.load_or_create(Role.SYSTEM_USER, Role.SYSTEM, "Logged in users")
    Role.load_cli_user()
    db.session.commit()