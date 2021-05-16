from bard.util import ensure_list, ensure_dict, as_bool
from bard.dakobed_schemas.types import registry
from bard.dakobed_schemas.utils import gettext
from bard.dakobed_schemas.property import Property


class Schema(object):

    def __init__(self, model, name, data):
        self.model = model
        self.name = name
        self.data = data
        self._label = data.get("label", name)

        self.extends = set()
        self.schemata = set([self])
        self.names = set([self.name])
        self.properties = {}
        for name, prop in data.get("properties", {}).items():
            self.properties[name] = Property(self, name, prop)

    def generate(self):
        for parent in ensure_list(self.data.get("extends")):
            parent = self.model.get(parent)
            parent.generate()

            for name, prop in parent.properties.items():
                if name not in self.properties:
                    self.properties[name] = Property(self, name, prop)

    @property
    def label(self):
        return gettext(self._label)

    @property
    def sorted_properties(self):
        return sorted(
            self.properties.values(),
            key=lambda p: (
                p.label
            )
        )

    def validate(self, data):
        """
        Validate a dataset against the given schema.  This will also drop keys which are not present as properties
        """
        errors = {}
        properties = ensure_dict(data.get("properties"))
        for name, prop in self.properties.items():
            values = ensure_list(prop)

    def to_dict(self):
        data = {
            "label": self.label,
            "schemta": list(sorted(self.names)),
            "properties": {}
        }
        return data

    def __eq__(self, other):
        return hash(other) == hash(self)

    def __lt__(self, other):
        return self.name.__lt__(other.name)

    def __hash__(self):
        return hash(self.name)

    def __repr__(self):
        return "Schema(%r)>" % self.name