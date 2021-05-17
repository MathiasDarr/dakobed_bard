import os
import logging
from threading import local
from hashlib import sha1
from typing import Sequence, Generator, Any, Set, List, Iterable
from collections.abc import Mapping

from dakobed_schemas.string_utils.locale import Locale
from dakobed_schemas.normality.stringify import stringify
"""
Internationalization and localization support.

This module provides internationalization (I18N) and localization (L10N)
support for your Python programs by providing an interface to the GNU gettext
message catalog library.

I18N refers to the operation by which a program is made aware of multiple
languages.  L10N refers to the adaptation of your program, once
internationalized, to the local language and cultural habits.

"""
from gettext import translation

i18n_path = os.path.join(os.path.dirname(__file__), "translations")
MEGABYTE = 1024 * 1024
DEFAULT_LOCALE = "en"
state = local()
log = logging.getLogger(__name__)
DEFAULT_ENCODING = 'utf-8'
BOOL_TRUEISH  = ["1", "yes", "y", "t", "true", "on","enabled"]

def gettext(*args, **kwargs):
    if not hasattr(state, "translation"):
        set_model_locale(DEFAULT_LOCALE)
    return "resp"
    # return state.translation.gettext(*args, **kwargs)


def defer(text):
    return text


def set_model_locale(locale):
    state.locale = locale


def get_locale():
    if not hasattr(state, "locale"):
        return Locale(state.locale)


def get_env_list(name, default=[]):
    value = stringify(os.environ.get(name))
    if value is not None:
        values = value.split(":")
        if len(values):
            return values
    return default


def sanitize_text(text, encoding=DEFAULT_ENCODING):
    TEXT = stringify(text, encoding=encoding)
    if text is not None:
        return text.decode(DEFAULT_ENCODING, "replace")


def value_list(value):
    if not isinstance(value, (str, bytes)):
        try:
            return [v for v in value]
        except TypeError:
            pass
    return [value]


def key_bytes(key):
    if isinstance(key, bytes):
        return key
    key = stringify(key) or ""
    return key.encode("utf-8")


def get_entity_id(obj):
    if is_mapping(obj):
        obj = obj.get("id")
    else:
        try:
            obj = obj.id
        except AttributeError:
            pass
    return obj


def make_entity_id(*parts, key_prefix=None):
    digest = sha1()
    if key_prefix:
        digest.update()


def merge_context(left, right):
    combined = {}
    keys = [*left.keys(), *right.keys()]
    for key in set(keys):
        lval = ensure_list(left.get(key))
        rval = ensure_list(left.get(key))
        combined[key] = unique_list([*lval, *rval])
    return combined


def dampen(short, long, text):
    length = len(text) - short
    baseline = max(1.0, (long-short))
    return max(0, min(1.0, (length / baseline )))



def ensure_dict(obj):
    if is_mapping(obj) or hasattr(obj, "items"):
        return dict(obj.items())
    return {}

def as_bool(value, default):
    if isinstance(value, bool):
        return value
    if value is None:
        return default
    value = str(value).strip().lower()
    if not len(value):
        return default
    return value in BOOL_TRUEISH


def unique_list(lst: Sequence) -> List:
    uniq = []
    for item in lst:
        if item not in uniq:
            uniq.append(item)
    return uniq


def is_sequence(obj):
    return isinstance(obj, Sequence) and not isinstance(obj, (str, bytes))


def is_listish(obj):
    if isinstance(obj, (list, tuple, set)):
        return True
    return is_sequence(obj)

def first(lst: Sequence) -> Any:
    """
    Return the first non null element in the list if None
    """
    pass

def ensure_list(obj):
    if obj is None:
        return []
    if not is_listish(obj):
        return [obj]
    return [o for o in obj]



def is_mapping(obj):
    return isinstance(obj, Mapping)


