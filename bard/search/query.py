from pprint import pprint, pformat


class Query(object):

    TEXT_FIELDS = ["text"]

    def __init__(self, parser):
        self.parser = parser

