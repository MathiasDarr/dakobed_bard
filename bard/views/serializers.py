import logging
from bard.views.util import jsonify

log = logging.getLogger(__name__)

class Serializer(object):
    def __init__(self, nested = False):
        self.nested = nested

    def _serialize(self, obj):
        return obj

    def serialize(self, obj):
        pass

    def _to_dict(self, obj):
        if hasattr(obj, "to_dict"):
            obj = obj.to_dict()
        if hasattr(obj, "_asdict"):
            obj = obj._asdict()
        return obj

    @classmethod
    def jsonify(cls, obj, **kwargs):
        data = cls().serialize(obj)
        return jsonify(data, **kwargs)


class CollectionSerializer(Serializer):
    def collect(self, obj):
        pass

    def _serialize(self, obj):
        pk = obj.get("id")
        return obj