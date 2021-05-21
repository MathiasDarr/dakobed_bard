import re
import unicodedata
from typing import Any, Optional
from dakobed_schemas.normality.utils import is_text
from dakobed_schemas.normality.constants import WS, UNICODE_CATEGORIES
from dakobed_schemas.normality.utils import Categories, is_text

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


def decompose_nfkd(text: Any) -> Optional[str]:
    """
    Perform unicode compatibility decomposition1
    """
    if not is_text(text):
        return None
    return unicodedata.normalize('NFKD', text)


def category_replace(text: Any,
                     replacements: Categories = UNICODE_CATEGORIES
                     ) -> Optional[str]:
    """
    Remove characters from a string based on unicode classes.

    This method removes non-text characters such as punctuation, whitepsace, from a piece of text by class,
    rather than specifying them incividually.
    """
    text = decompose_nfkd(text)
    if not is_text(text):
        return None
    characters = []
    for character in text:
        cat = unicodedata.category(character)
        replacement = replacements.get(cat, character)
        if replacement is not None:
            characters.append(replacement)
    return u''.join(characters)