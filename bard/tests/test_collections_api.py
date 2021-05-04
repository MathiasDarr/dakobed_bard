import json

from bard.core import db
from bard.authz import Authz
from bard.views.util import validate
from bard.tests.util import TestCase, JSON


class CollectionsApiTestCase(TestCase):
    def setUp(self):
        super(CollectionsApiTestCase, self).setUp()

    def test_create_collection(self):
        url = "/api/2/collections"
        data = {"label": "first_label"}
        res = self.client.post(url, data=json.dumps(data), content_type=JSON)
        assert res.status_code == 200

