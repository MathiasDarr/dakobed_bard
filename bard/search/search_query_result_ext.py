from datetime import datetime

from bard.search.result import SearchQueryResult
import logging

log = logging.getLogger(__name__)


class SearchQueryResultExt(SearchQueryResult):
    def __init__(self, request, query):
        super(SearchQueryResultExt, self).__init__(request, query)

    def to_dict(self, serializer=None):
        data = super(SearchQueryResultExt, self).to_dict(serializer=serializer)
        return data
