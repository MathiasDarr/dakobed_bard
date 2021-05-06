import flask_migrate
from sqlalchemy import MetaData, inspect
from sqlalchemy.exc import InternalError
from sqlalchemy.dialects.postgresql import ENUM

from bard.index.admin import upgrade_search, delete_index
from bard.index.util import delete_safe
from bard.logic.roles import create_system_roles, create_user
from bard.logic.collections import create_collection
from bard.core import db


def seed_data():

    create_collection({"label": "first_collection"})


def cleanup_deleted():
    from bard.models import Collection

    Collection.cleanup_deleted()
    db.session.commit()


def upgrade_system():
    # delete_index()
    # index = 'bard-collection-v1'
    # delete_safe(index)

    flask_migrate.upgrade()
    create_system_roles()
    upgrade_search()
    create_user("mddarr@gmail.com", "Mathias", "password", True)
    seed_data()


def destroy_db():
    metadata = MetaData()
    metadata.bind = db.engine
    metadata.reflect()
    tables = list(metadata.sorted_tables)
    while len(tables):
        for table in tables:
            try:
                table.drop(checkfirst=True)
                tables.remove(table)
            except InternalError:
                pass
    for enum in inspect(db.engine).get_enums():
        enum = ENUM(name=enum["name"])
        enum.drop(bind=db.engine, checkfirst=True)

