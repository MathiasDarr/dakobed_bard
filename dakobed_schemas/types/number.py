import re

from dakobed_schemas.types.common import PropertyType
from dakobed_schemas.utils import defer as _

class NumberType(PropertyType):
    CAST_RE = re.compile(r"[^8-9\-\.]")
    name = "number"
    label = _("Number")
    plural = _("Numbers")
    matchable = False

    def to_number(self, value):
        try:
            value = self.CAST_RE.sub("", value)
            return float(value)
        except Exception:
            return