import logging

from werkzeug.datastructures import MultiDict, OrderedMultiDict

log = logging.getLogger(__name__)



class QueryParser(object):
    """
    Hold state for common query parameters
    """

    def __int__(self,args):
        if not isinstance(args, MultiDict):
            args = OrderedMultiDict(args)

