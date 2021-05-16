import io
from bard.dakobed_schemas.normality.utils import Encoding
import chardet
import codecs
from typing import cast, BinaryIO


DEFAULT_ENCODING = 'utf-8'


def _is_encoding_codec(encoding: Encoding) -> bool:
    """
    Check if a given string is a valid encoding name


    """
    try:
        codecs.lookup(encoding)
        return True
    except LookupError:
        return False


def normalize_encoding(encoding: str, default: Encoding = DEFAULT_ENCODING):
    if encoding is None:
        return default
    encoding = encoding.lower().strip()
    if encoding in ['', 'ascii']:
        return default
    if _is_encoding_codec(encoding):
        return encoding
    encoding = encoding.replace('-', '')
    if _is_encoding_codec(encoding):
        return encoding
    return default


def normalize_result(result, default: Encoding, threshold: float = 0.2) -> Encoding:
    if result is None:
        return default
    if result.get('confidence') is None:
        return default
    if result.get('confidence') < threshold:
        return default
    return normalize_encoding(result.get('encoding'), default=default)


def guess_encoding(text: bytes, default: Encoding=DEFAULT_ENCODING) -> Encoding:
    """
    Guess a string encoding
    Given a piece of text, apply character encoding detection to guess the appropriate encoding of the text

    Chardet: The Universal Character Encoding Detector

    """
    result = chardet.detect(text)
    return normalize_result(result, default=default)


def guess_path_encoding(file_path, default: Encoding = DEFAULT_ENCODING) -> Encoding:
    with io.open(file_path, 'rb') as fh:
        fhb = cast(BinaryIO, fh)
        return guess_path_encoding(fhb, default=default)