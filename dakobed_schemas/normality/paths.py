import sys
from typing import Optional
from dakobed_schemas.normality.stringify import stringify
from dakobed_schemas.normality.cleaning import category_replace, collapse_spaces
from dakobed_schemas.normality.constants import UNICODE_CATEGORIES, WS
import os

MAX_LENGTH = 254

def decode_path(file_path: Optional[str]):
    if file_path is None:
        return
    if isinstance(file_path, bytes):
        file_path = file_path.decode(sys.getfilesystemencoding())
    return file_path


def _safe_name(file_name, sep):
    file_name = stringify(file_name)
    if file_name is None:
        return
    file_name = category_replace(file_name, UNICODE_CATEGORIES)
    file_name = collapse_spaces(file_name)
    if file_name is None or not len(file_name):
        return
    return file_name.replace(WS, sep)


def safe_filename(file_name, sep ='_', default=None, extension=None):
    if file_name is None:
        return decode_path(file_name)

    file_name = decode_path(file_name)
    file_name = os.path.basename(file_name)
    file_name, _extension = os.path.splitext(file_name)
    file_name = _safe_name(file_name, sep=sep)
    if file_name is None:
        return decode_path(default)
    file_name = file_name[:MAX_LENGTH]
    extension = _safe_name(extension or _extension, sep=sep)
    if extension is not None:
        file_name = '.'.join((file_name, extension))
        file_name = file_name[:MAX_LENGTH]
    return file_name