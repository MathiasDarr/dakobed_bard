from __future__ import unicode_literals
import six
from six.moves.urllib.parse import quote, quote_plus
from chardet import detect

import string

import six
from os.path import normpath
from six.moves.urllib.parse import urlunsplit
from six.moves.urllib.parse import urlsplit

# from urlnormalizer.utils import _parse_qsl, _urlencode, _quote, _unquote
# from urlnormalizer.validator import is_valid_url
# from urlnormalizer.constants import SCHEMES, DEFAULT_PORTS


def normalize_url(url, extra_query_args=None, drop_fragments=True):
    """Normalize a url to its canonical form.
    Parameters
    ----------
    url: str
        URL to be normalize
    extra_query_args: list of 2-element str tuples, optional
        A list of tuples with further query arguments that need to be appended
        to the URL
    drop_fragments: boolean
        Keep or drop url fragments
    Returns
    -------
    str
        A normalized url with supplied extra query arguments
    None
        If the passed string doesn't look like a URL, return None
    """
    if not isinstance(url, six.string_types):
        return None
    url = url.strip()
    if not url.lower().startswith(SCHEMES):
        if url.startswith("//"):
            url = "http:" + url
        else:
            url = "http://" + url
    if not is_valid_url(url):
        # Doesn't look like a valid URL
        return None
    parts = urlsplit(url)

    scheme, netloc, path, query, fragment, username, password, port = (
        parts.scheme, parts.netloc, parts.path, parts.query,
        parts.fragment, parts.username, parts.password, parts.port
    )

    # normalize parts
    path = _normalize_path(path)
    netloc = _normalize_netloc(scheme, netloc, username, password, port)
    query = _normalize_query(query, extra_query_args)

    if drop_fragments:
        fragment = ""

    # Put the url back together
    url = urlunsplit((scheme, netloc, path, query, fragment))
    return url


def _normalize_path(path):
    # If there are any `/` or `?` or `#` in the path encoded as `%2f` or `%3f`
    # or `%23` respectively, we don't want them unquoted. So escape them
    # before unquoting
    for reserved in ('2f', '2F', '3f', '3F', '23'):
        path = path.replace('%' + reserved, '%25' + reserved.upper())
    # unquote and quote the path so that any non-safe character is
    # percent-encoded and already percent-encoded triplets are upper cased.
    unquoted_path = _unquote(path)
    path = _quote(unquoted_path) or '/'
    trailing_slash = path.endswith('/')
    # Use `os.path.normpath` to normalize paths i.e. remove duplicate `/` and
    # make the path absolute when `..` or `.` segments are present.
    path = normpath(path)
    # normpath strips trailing slash. Add it back if it was there because
    # this might make a difference for URLs.
    if trailing_slash and not path.endswith('/'):
        path = path + '/'
    # POSIX allows one or two initial slashes, but treats three or more
    # as single slash.So if there are two initial slashes, make them one.
    if path.startswith('//'):
        path = '/' + path.lstrip('/')
    return path


def _normalize_netloc(scheme, netloc, username, password, port):
    # Leave auth info out before fiddling with netloc
    auth = None
    if username:
        auth = username
        if password:
            auth += ":" + password
        netloc = netloc.split(auth)[1][1:]
    # Handle international domain names
    netloc = netloc.encode("idna").decode("ascii")
    # normalize to lowercase and strip empty port or trailing period if any
    netloc = netloc.lower().rstrip(":").rstrip(".")
    # strip default port
    if port and DEFAULT_PORTS.get(scheme) == port:
        netloc = netloc.rstrip(":" + str(port))
    # Put auth info back in
    if auth:
        netloc = auth + "@" + netloc
    return netloc


def _normalize_query(query, extra_query_args):
    # Percent-encode and sort query arguments.
    queries_list = _parse_qsl(query)
    # Add the additional query args if any
    if extra_query_args:
        for (name, val) in extra_query_args:
            queries_list.append((name, val))
    return _urlencode(queries_list)


# Reserved delimeters from https://tools.ietf.org/html/rfc3986#section-2.2
GEN_DELIMS = ":/?#[]@"
SUB_DELIMS = "!$&'()*+,;="
RESERVED_CHARS = GEN_DELIMS + SUB_DELIMS

# Unreserved characters from https://tools.ietf.org/html/rfc3986#section-2.3
UNRESERVED_CHARS = string.ascii_letters + string.digits + "-._~"

SAFE_CHARS = RESERVED_CHARS + UNRESERVED_CHARS + '%'

DEFAULT_PORTS = {
    "http": 80,
    "https": 443
}

SCHEMES = ("http", "https")



if six.PY3:
    from urllib.parse import unquote_to_bytes
else:
    from urllib import unquote as unquote_to_bytes

_enc = 'utf-8'
_enc_fallback = 'raw_unicode_escape'


def _noop(obj):
    return obj


def _encode_result(obj):
    return obj.encode(_enc)


def _decode_args(args):
    return tuple(x.decode(_enc) if x else '' for x in args)


def _coerce_args(*args):
    # Invokes decode if necessary to create str args
    # and returns the coerced inputs along with
    # an appropriate result coercion function
    #   - noop for str inputs
    #   - encoding function otherwise
    str_input = isinstance(args[0], six.text_type)
    for arg in args[1:]:
        # We special-case the empty string to support the
        # "scheme=''" default argument to some functions
        if arg and isinstance(arg, six.text_type) != str_input:
            raise TypeError("Cannot mix str and non-str arguments")
    if str_input:
        return args + (_noop,)
    return _decode_args(args) + (_encode_result,)


def _parse_qsl(qs, keep_blank_values=False, strict_parsing=False):
    """Modify `urllib.parse.parse_qsl` to handle percent-encoded characters
    properly. `parse_qsl` replaces percent-encoded characters with
    replacement character (U+FFFD) (if errors = "replace") or drops them (if
    errors = "ignore") (See https://docs.python.org/3/howto/unicode.html#the-string-type).  # noqa
    Instead we want to keep the raw bytes. And later we can percent-encode them
    directly when we need to.
    Code from https://github.com/python/cpython/blob/73c4708630f99b94c35476529748629fff1fc63e/Lib/urllib/parse.py#L658  # noqa
    with `unquote` replaced with `unquote_to_bytes`
    """
    qs, _coerce_result = _coerce_args(qs)
    pairs = [s2 for s1 in qs.split('&') for s2 in s1.split(';')]
    r = []
    for name_value in pairs:
        if not name_value and not strict_parsing:
            continue
        nv = name_value.split('=', 1)
        if len(nv) != 2:
            if strict_parsing:
                raise ValueError("bad query field: %r" % (name_value,))
            # Handle case of a control-name with no equal sign
            if keep_blank_values:
                nv.append('')
            else:
                continue
        if len(nv[1]) or keep_blank_values:
            name = nv[0].replace('+', ' ')
            name = unquote_to_bytes(name)
            name = _coerce_result(name)
            value = nv[1].replace('+', ' ')
            value = unquote_to_bytes(value)
            value = _coerce_result(value)
            r.append((name, value))
    return r


def _quote(text, plus=False):
    if text is None:
        return ''
    if not isinstance(text, (six.text_type, six.binary_type)):
        text = six.text_type(text)
    if isinstance(text, six.text_type):
        text = text.encode(_enc)
    if plus:
        return quote_plus(text, safe=SAFE_CHARS)
    return quote(text, safe=SAFE_CHARS)


def _unquote(text):
    if isinstance(text, six.text_type):
        text = text.encode(_enc)
    text = unquote_to_bytes(text)
    try:
        text = text.decode(_enc)
    except UnicodeDecodeError:
        try:
            encoding = detect(text).get('encoding', _enc_fallback)
            text = text.decode(encoding, 'ignore')
        except Exception:
            return ''
    return text


def _urlencode(queries):
    parts = []
    for k, v in queries:
        part = _quote(k, plus=True), _quote(v, plus=True)
        parts.append('='.join(part))
    parts = sorted(set(parts))
    return '&'.join(parts)


def query_string(items):
    """Given a list of tuples, returns a query string for URL building."""
    query = [(k, v) for (k, v) in items if v is not None]
    if not len(query):
        return ''
    return '?' + _urlencode(query)

