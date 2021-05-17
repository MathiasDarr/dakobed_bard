import os
import yaml

from dakobed_schemas.exc import InvalidData, InvalidModel
from dakobed_schemas.schema import Schema
from dakobed_schemas.types import registry
from dakobed_schemas.mapping.query import QueryMapper
from dakobed_schemas.proxy import EntityProxy

import logging

log = logging.getLogger(__name__)


class Model(object):
    """
    A collection of schemata
    """
    def __init__(self, path):
        self.path = path
        self.schemata = {}
        self.properties = set()
        self.qnames = {}

        log.warning("FROM THE INIT AND OS WALK ON THE PATH {}".format(self.path))


        log.warning("THJE PATH LOOKS LIKE {}".format(self.path))
        for (path, _, filenames) in os.walk(self.path):
            for filename in filenames:
                self._load(os.path.join(path, filename))
        self.generate()

    def generate(self):
        for schema in self:
            schema.generate()
        for prop in self.properties:
            self.qnames[prop.qname] = prop
            for schema in prop.schema.descendants:
                if prop.name not in schema.properties:
                    schema.properties[prop.name] = prop

    def _load(self, filepath):
        log.warning("I AM _LOADING THE FILEPATH {}".format(filepath))
        with open(filepath, 'r', encoding="utf-8") as fh:
            data = yaml.safe_load(fh)
            if not isinstance(data, dict):
                raise InvalidModel("Model file is not a mapping: %s " % filepath)
            for name, config in data.items():
                self.schemata[name] = Schema(self, name, config)

    def get(self, name):
        if isinstance(name, Schema):
            return name
        return self.schemata.get(name)

    def get_qname(self, qname):
        return self.qnames.get(qname)

    def __getitem__(self, name):
        schema = self.get(name)
        if schema is None:
            raise KeyError("No such schema: %s" % name)
        return schema

    def get_type_schemata(self, type_):
        """
        Return all the schemata which have a property of the given type
        """
        schemata = set()
        for schema in self.schemata.values():
            for prop in schema.properties.values():
                if prop.type == type_:
                    schemata.add(schema)
        return schemata

    def make_mapping(self, mapping, key_prefix=None):
        return QueryMapper(self, mapping, key_prefix=key_prefix)

    def make_entities(self, mapping, key_prefix=None):
        """
        Given a mapping, yield a series of entities from the data source
        """
        mapping = self.make_mapping(mapping, key_prefix=key_prefix)
        for record in mapping.source.records:
            for entity in mapping.map(record).values():
                yield entity

    def make_entity(self, schema, key_prefix=None):
        return EntityProxy(self, {"schema": schema}, key_prefix=key_prefix)

    def get_proxy(self, data, cleaned=True):
        return EntityProxy(self, data, cleaned=cleaned)

    def to_dict(self):
        log.warning("LOGGING THE WARNING TO DICT")
        return {
            "schemata": {s.name: s.to_dict() for s in self.schemata.values()},
            "types": {t.name: t.to_dict() for t in registry.types}
        }

    def __iter__(self):
        return iter(self.schemata.values())


