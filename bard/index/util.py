import logging

from bard.core import es, settings

log = logging.getLogger(__name__)


def index_name(name, version):
    return "-".join((settings.INDEX_PREFIX, name, version))

