import re
import unicodedata
from typing import Any, Optional
from bard.dakobed_schemas.normality.utils import is_text
from bard.dakobed_schemas.normality.constants import WS

COLLAPSE_REGULAR_EXPRESSION = re.compile(r'\s+', re.U)
BOM_REGULAR_EXPRESSION = re.compile(r'^ufeff', re.U)
QUOTES_REGULAR_EXPRESSION = re.compile(r'^["\'](.*)["\']$')


def strip_quotes(text: Any) -> Optional[str]:
    if not is_text(text):
        return None
    return QUOTES_REGULAR_EXPRESSION.sub('\\1', text)


def collapse_spaces(text: Any) -> Optional[str]:
    if not is_text(text):
        return None
    return COLLAPSE_REGULAR_EXPRESSION.sub(WS, text).strip(WS)