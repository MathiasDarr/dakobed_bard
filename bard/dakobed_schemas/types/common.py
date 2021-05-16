from itertools import product
from typing import Any, Optional
from bard.util import ensure_list




class PropertyType(object):
    name: Optional[str] = None
    label: Optional[str] = None

    def validate(self, text: Any, **kwargs):
        pass

    def clean(self, text: Any, **kwargs):
        pass

    def clean_text(self, text: Optional[str], **kwargs):
        return text

    def join(self, values):
        values = ensure_list(values)
        return "; ".join(values)

    def _specificity(self, value):
        return 1.0

    def specificity(self, value):
        if not self.matchable or value is None:
            return 0.0
        return self._specificity(value)

    def __eg__(self, other):
        return self.name == other.name

    def __repr__(self):
        return "<%s()>" % type(self).__name__