"""
Helper functions for string cleaning

dakobed_schemas/normality includes functions to convert arbitrary Python objects to strings.

"""
from typing import Any, Optional
from dakobed_schemas.normality.utils import Encoding
from dakobed_schemas.normality.stringify import stringify
from dakobed_schemas.normality.encoding import DEFAULT_ENCODING
from dakobed_schemas.normality.constants import WS
from dakobed_schemas.normality.paths import safe_filename

def normalize(text, encoding_default: Encoding = DEFAULT_ENCODING, encoding: Optional[str] = None):
    """
    Main normalization function for text
    """

    text = stringify(text, encoding_default=encoding_default, encoding=encoding)
    return text


def slugify(text: Any, sep: str = '-') -> Optional[str]:
    """
    A simple slug generator
    """
    text = stringify(text)
    if text is None:
        return None
    text = text.replace(sep, WS)
    text = normalize(text, ascii=True)
    if text is None:
        return None
    return text.replace(WS, sep)