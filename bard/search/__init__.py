import logging
from bard.search.query import Query


log = logging.getLogger(__name__)


class CollectionsQuery(Query):

    PREFIX_FIELD = "label"

    def get_filters(self, **kwargs):
        filters = super(CollectionsQuery, self).get_filters(**kwargs)
        if self.parser.getbool("filter:writeable"):
            ids = self.parser.authz.collections()



    def get_index(self):
        return