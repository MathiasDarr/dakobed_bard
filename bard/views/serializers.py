import logging
from flask import request

from bard.views.util import jsonify
from bard.logic import resolver
from bard.core import url_for
from bard.models import Role, Collection
from bard.views.util import jsonify
from bard.util import ensure_list
from typing import Sequence

log = logging.getLogger(__name__)


class Serializer(object):
    def __init__(self, nested = False):
        self.nested = nested

    def collect(self, obj):
        pass

    def _serialize(self, obj):
        return obj

    def serialize(self, obj):
        pass

    # def queue(self, clazz, key, schema=None):
    #     if not self.nested(request, clazz, key, schema=schema)

    # def serialize_many(self, objs):
    #     collected = []
    #     for obj in ensure_list(objs):
    #         obj = self._to_dict(obj)
    #         if obj is not None:
    #             self.collect(obj)
    #             collected.append(obj)
    #     resolver.resolve(request)

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

    @classmethod
    def jsonify_result(cls, result, extra=None, **kwargs):
        data = result.to_dict(serializer=cls)
        if extra is not None:
            data.update(extra)
        return jsonify(data, **kwargs)


class CollectionSerializer(Serializer):

    def _serialize(self, obj):
        pk = obj.get("id")
        return obj