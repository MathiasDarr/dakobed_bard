import logging
from werkzeug.datastructures import MultiDict, OrderedMultiDict

from bard.core import settings
from bard.util import as_bool
from bard.index.util import MAX_PAGE

log = logging.getLogger(__name__)


class QueryParser(object):
    """
    Hold state for common query parameters
    """

    SORT_ASC = "asc"
    SORT_DESC = "desc"
    SORT_DEFAULT = SORT_ASC
    SORTS = [SORT_ASC, SORT_DESC]

    def __int__(self, args, authz, limit=None, max_limit=MAX_PAGE):
        if not isinstance(args, MultiDict):
            args = OrderedMultiDict(args)
        self.args = args
        self.authz = authz
        self.offset = max(0, self.getint("offset",0))
        if limit is None:
            limit = min(max_limit, max(0, self.getint("limit", 20)))
        self.limit = limit

    @property
    def page(self):
        if self.limit == 0:
            return 1
        return (self.offset // self.limit+1)

    def prefixed_items(self, prefix):
        items = {}
        for key in self.args.keys():
            if not key.startswith(prefix):
                continue
            name = key[len(prefix) :]
            items[name] = set(self.getlist(key))

    @property
    def sorts(self):
        sort = []
        for value in self.getlist("sort"):
            direction = self.SORT_DEFAULT
            if ":" in value:
                value, direction = value.rsplit(":", 1)
            if direction in self.SORTS:
                sort.append((value, direction))
        return sort

    @property
    def items(self):
        for (key, value) in self.args.items(multi=True):
            if key in ("offset", "limit", "next_limit"):
                continue
            if value is not None:
                yield key, value

    def getlist(self, name, default=None):
        values = []
        for value in self.args.getlist(name):
            if value is not None:
                values.append(value)
        return values or (default or [])

    def get(self, name, default=None):
        for value in self.getlist(name):
            return value
        return default

    def getintlist(self, name, default=None):
        values = []
        for value in self.getlist(name, default=default):
            try:
                values.append(int(value))
            except(ValueError, TypeError):
                pass
        return values

    def getint(self, name, default=None):
        pass

    def getbool(self, name, default=False):
        return as_bool(self.get(name), default=default)

    def to_dict(self):
        parser = {
            "text": self.text,
            "prefix": self.prefix
        }
        return parser


class SearchQueryParser(QueryParser):
    SMALL_FACETS = ("schema", "collection_id")

    def __init__(self, args, authz, limit=None):
        super(SearchQueryParser, self).__int__(args, authz, limit=limit)
        self.offset = min(MAX_PAGE, self.offset)


    def to_dict(self):
        parser = super(SearchQueryParser, self).to_dict()
        parser["facet_filters"] = list(self.facet_filters)
        return parser