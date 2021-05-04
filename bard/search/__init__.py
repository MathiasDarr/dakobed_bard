import logging
from bard.search.query import Query
from bard.index.collections import collections_index
from bard.search.parser import QueryParser, SearchQueryParser
from bard.search.result import QueryResult, DatabaseQueryResult


log = logging.getLogger(__name__)


class CollectionsQuery(Query):

    PREFIX_FIELD = "label"
    SOURCE = {"excludes": ["text"]}

    def get_filters(self, **kwargs):
        filters = super(CollectionsQuery, self).get_filters(**kwargs)
        if self.parser.getbool("filter:writeable"):
            ids = self.parser.authz.collections(self.parser.authz.WRITE)
            filters.append({"ids": {"values": ids}})
        return filters

    def get_index(self):
        return collections_index()

