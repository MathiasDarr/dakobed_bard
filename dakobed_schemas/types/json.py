import json
from dakobed_schemas.utils import ensure_list

from dakobed_schemas.types.common import PropertyType
from dakobed_schemas.utils import sanitize_text, defer as _


class JsonType(PropertyType):
    name = "json"
    group = None
    label = _("Nested data")
    matchable = False

    def pack(self, obj):
        """Encode a given value to JSON"""
        if obj is not None:
            return json.dumps(obj)

    def unpack(self, obj):
        if obj is None:
            return
        try:
            return json.loads(obj)
        except Exception:
            return obj

    def clean(self, obj, **kwargs):
        if not isinstance(obj, str):
            obj = self.pack(obj)
        else:
            obj = sanitize_text(obj)
        return obj

    def join(self, values):
        values = [self.unpack(v) for v in ensure_list(values)]
        return self.pack(values)

    def node_id(selfself, value):
        return None