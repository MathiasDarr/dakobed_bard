import logging
import os
import unittest
from flask import json
from werkzeug.utils import cached_property
from faker import Factory

from bard.core import db, kv, create_app
from bard.oauth import oauth
from bard.migration import destroy_db
from bard.logic.roles import create_system_roles
from bard.models import Role, Collection, Permission
from bard.index.admin import delete_index, upgrade_search, clear_index
from bard import settings


log = logging.getLogger(__name__)
APP_NAME = "bard-test"
UI_URL="http://bard.ui"
FIXTURES = os.path.join(os.path.dirname(__file__), "fixtures")
DB_URI = settings.DATABASE_URI + "_test"
JSON = "application/json"

class JsonResponseMixin(object):
    """
    Mixin with testing helper methods
    """
    @cached_property
    def json(self):
        return json.loads(self.data)

def _make_test_response(response_class):
    pass

class TestCase(unittest.TestCase):
    fake = Factory.create()

    def create_app(self):
        oauth.remote_apps = {}
        settings.DEBUG = True
        settings.CACHE = True
        settings.OAUTH = True
        settings.SECRET_KEY = "batman"
        settings.APP_UI_URL= UI_URL
        settings.DATABASE_URI = DB_URI
        settings.BARD_PASSWORD_LOGIN = True
        settings.INDEX_WRITE = "yolo"
        settings.INDEX_READ = [settings.INDEX_WRITE]
        app = create_app({})
        return app

    def create_user(self, foregin_id="tester", name=None, email=None, is_admin=False):
        role = Role.load_or_create(
            foregin_id,
            Role.USER,
            name or foregin_id,
            email=email or self.fake.email(),
            is_admin=is_admin
        )
        db.session.commit()
        return role