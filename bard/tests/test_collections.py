from bard.logic.collections import delete_collection
from bard.tests.util import TestCase

class IndexTestCase(TestCase):
    def test_delete_collection(self):
        self.load_fixtures()
        # url="/api/2/entities?filter:schemata=Thing&q=domepeak"
        # res = self.client.get(url)
        # assert res.json["total"] == 1, res.json
        # delete_collection(self.public_coll)
        # res = self.client.get(url)
        # assert res.json["total"] == 0, res.json