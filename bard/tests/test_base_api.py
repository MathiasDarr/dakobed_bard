from bard.tests.util import TestCase
import logging


log = logging.getLogger(__name__)

class BaseApiTestCase(TestCase):
    def setUp(self):
        super(BaseApiTestCase, self).setUp()

    def test_metadata(self):
        assert 1 == 1
        res = self.client.get("/api/2/metadata")
        assert res.status_code == 200
        # log.warning("THE RESULT IS {}".format(res))

