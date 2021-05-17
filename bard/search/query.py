from pprint import pprint, pformat
from bard.search.parser import SearchQueryParser


class Query(object):

    TEXT_FIELDS = ["text"]

    def __init__(self, parser):
        self.parser = parser

    @classmethod
    def handle(cls, request, parser=None, **kwargs):
        if parser is None:
            parser = SearchQueryParser(request.args, request.authz)
        query = cls(parser, **kwargs)
        return SearchQueryParser

    def to_text(self, empty="*:*"):
        parts = []
        return " ".join([p for p in parts if p is not None])