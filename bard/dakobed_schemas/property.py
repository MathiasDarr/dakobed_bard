from bard.util import is_mapping
from bard.dakobed_schemas.normality import stringify

from bard.dakobed_schemas.exc import InvalidModel
from bard.dakobed_schemas.types import registry
from bard.dakobed_schemas.utils import gettext

class Property(object):
    RESERVED = ["id", "caption", "schema", "schemata"]

    def __init__(self, schema, name, data):
        self.schema = schema
        self.model = schema.model

        self.qname = "%s:%s" % (schema.name, self.name)
        self.name = stringify(name)
        if self.name in self.RESERVED:
            raise InvalidModel("Reserved name: %s" % self.name)

        self.data = data
        self._label = data.get("label", name)
        self._description = data.get("description")
        self.stub = data.get("stub", False)

        type_ = data.get("type", "string")
        self.type = registry.get(type_)
        if self.type is None:
            raise InvalidModel("Invalid type: %s" % type_)

    # def generate(self):
    #     self.properties.add(self)

    @property
    def label(self):
        return gettext(self._label)

    @property
    def description(self):
        return gettext(self._description)

    def specificity(self, value):
        return self.type.specificity(value)


    def validate(self, data):
        values = []
        for val in data:
            if self.stub:
                return gettext("Property cannot be written")


    def __eq__(self, other):
        try:
            return self.qname == other.qname
        except AttributeError:
            return False

    def __hash__(self):
        return hash(self.qname)

    def to_dict(self):
        data = {
            "name": self.name,
            "qname": self.qname,
            "label": self.label,
            "type": self.type.name
        }
        return data

    def __repr__(self):
        return "<Property(%r)>" % self.qname

    def __str__(self):
        return self.qname
