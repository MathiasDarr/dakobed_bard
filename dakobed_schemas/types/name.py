from dakobed_schemas.types.common import PropertyType
from dakobed_schemas.normality import slugify
from dakobed_schemas.normality.cleaning import strip_quotes, collapse_spaces
from dakobed_schemas.utils import sanitize_text, dampen
from dakobed_schemas.utils import first, ensure_list
from dakobed_schemas.utils import defer as _

from Levenshtein import jaro_winkler, setmedian


class NameType(PropertyType):
    name = "name"
    label = _("Name")

    def clean_text(self, name, **kwargs):
        name = strip_quotes(name)
        return collapse_spaces(name)

    def pick(self, values):
        values = [sanitize_text(v) for v in ensure_list(values)]
        values = [v for v in values if v is not None]
        if len(values) <= 1:
            return first(values)
        return setmedian(sorted(values))

    def _specificity(self, value):
        return dampen(3, 50, value)

    def compare(self, left, right):
        return jaro_winkler(left,right)

    def node_id(self, value):
        return "name:%s" % slugify(value)

