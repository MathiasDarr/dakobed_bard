import os
import yaml
import logging
from jsonschema import RefResolver, Draft4Validator
from apispec import APISpec
from apispec_webframeworks.flask import FlaskPlugin
from bard import __version__, settings
from bard.validation.spec import spec_info, spec_docs, spec_tags
SCHEMA_DIR = os.path.join(os.path.dirname(__file__), "schema")

log = logging.getLogger(__name__)


def get_schemata():
    schemata = {}
    for file_name in os.listdir(SCHEMA_DIR):
        file_path = os.path.join(SCHEMA_DIR, file_name)
        data = yaml.safe_load(open(file_path,"r"))
        schemata.update(data)
    return schemata


def get_openapi_spec(app):
    spec = APISpec(
        title="Bard API Documentation",
        version=__version__,
        openapi_version="3.0.2",
        info=spec_info,
        externalDocs=spec_docs,
        tags=spec_tags,
        plugins=[FlaskPlugin()],
    )
    for name, spec_ in get_schemata().items():
        spec.components.schema(name, spec_)
    return spec


def get_resolver():
    if not hasattr(settings, "_json_resolver"):
        resolver = RefResolver()

def get_validator(schema):
    ref = "#/components/schemas/%s" % schema
