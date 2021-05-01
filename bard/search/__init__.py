import logging
from bard.search.query import Query


log = logging.getLogger(__name__)


class CollectionsQuery(Query):

    PREFIX_FIELD = "label"


    def get_index(self):
        return