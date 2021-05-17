from dakobed_schemas.types.common import PropertyType
from dakobed_schemas.utils import defer as _
from dakobed_schemas.utils import MEGABYTE

class StringType(PropertyType):
    name = "string"
    label = _("Label")
    plural = _("Labels")
    matchable = False

    def node_id(self, value):
        return None


class TextType(StringType):
    name = "text"
    label = _("Text")
    plural = _("Texts")
    max_size = 30 * MEGABYTE


class HTMLType(StringType):
    name = "html"
    label = _("HTML")
    plural = _("HTMLs")
    max_size = 30 * MEGABYTE