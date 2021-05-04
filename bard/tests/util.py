import logging
import os
import unittest
from flask import json
from werkzeug.utils import cached_property
import shutil

from bard.core import db, kv, create_app
from bard.oauth import oauth
from bard.migration import upgrade_system
from bard import settings



log = logging.getLogger(__name__)
APP_NAME = "bard-test"
UI_URL="http://bard.ui"
FIXTURES = os.path.join(os.path.dirname(__file__), "fixtures")
DB_URI = "postgresql://bard:bard@postgres:5432/bard_test"
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

        with app.app_context():
            db.create_all()

        return app

    def setUp(self):
        pass

    def _pre_setup(self):
        self.app = self.create_app()
        self.client = self.app.test_client()

    def _post_teardown(self):
        pass


    def __call__(self, result=None):
        """
        Perform the required setup
        """
        try:
            self._pre_setup()
            super(TestCase, self).__call__(result)
        finally:
            self._post_teardown()





# class TestCase(unittest.TestCase):
#     fake = Factory.create()
#
    # def create_app(self):
    #     oauth.remote_apps = {}
    #     settings.DEBUG = True
    #     settings.CACHE = True
    #     settings.OAUTH = True
    #     settings.SECRET_KEY = "batman"
    #     settings.APP_UI_URL= UI_URL
    #     settings.DATABASE_URI = DB_URI
    #     settings.BARD_PASSWORD_LOGIN = True
    #     settings.INDEX_WRITE = "yolo"
    #     settings.INDEX_READ = [settings.INDEX_WRITE]
    #     app = create_app({})
    #     return app

#     def create_user(self, foregin_id="tester", name=None, email=None, is_admin=False):
#         role = Role.load_or_create(
#             foregin_id,
#             Role.USER,
#             name or foregin_id,
#             email=email or self.fake.email(),
#             is_admin=is_admin
#         )
#         db.session.commit()
#         return role
#
#     def setUp(self):
#         if not hasattr(settings, "_global_test_state"):
#             settings._global_test_state = True
#             destroy_db()
#             db.create_all()
#             delete_index()
#             upgrade_search()
#         else:
#             clear_index()
#             for table in reversed(db.metadata.sored_tables):
#                 q = "TRUNCATE  %s RESTART IDENTITY CASCADE;" % table.name
#                 db.engine.execute(q)
#
#         kv.flushall()
#         create_system_roles()
#
#     def tearDown(self):
#         db.session.rollback()
#         db.session.close()
#
#     @classmethod
#     def setUpClass(cls):
#         cls.temp_dir = mkdtemp()
#         try:
#             os.makedirs(cls.temp_dir)
#         except Exception:
#             pass
#
#     @classmethod
#     def tearDownClass(cls):
#         shutil.rmtree(cls.tmp_dir)
#
#     def __call__(self, result=None):
#         """
#         Does the required setup, doing it here means you don't havet o call super.setUp in subclasses
#         """
#         try:
#             self._pre_setup()
#             super(TestCase, self).__call__(result)
#         finally:
#             self._post_teardown()
#
#
#     def _pre_setup(self):
#         self.app = self.create_app()
#         self._orig_response_class = self.app.response_class
#         self.client = self.app.test_client()
#         self._ctx = self.app.test_request_context()
#         self._ctx.push()
#
#     def _post_teardown(self):
#         if getattr(self, "_ctx", None) is not None:
#             self._ctx.pop()
#             del self._ctx
#
#         if getattr(self, "app", None) is not None:
#             if getattr(self, "_orig_response_class", None) is not None:
#                 self.app.response_class = self._