from dakobed_schemas.utils import ensure_list, ensure_dict, as_bool
from dakobed_schemas.types import registry
from dakobed_schemas.utils import gettext
from dakobed_schemas.property import Property
from dakobed_schemas.exc import InvalidData, InvalidModel
import logging


log = logging.getLogger(__name__)



class Schema(object):
    def __init__(self, model, name, data):
        self.model = model
        self.name = name
        self.data = data
        self._label = data.get("label", name)
        self._plural = data.get("plural", self.label)

        # Generated by the system, not user-manage
        self.generated = as_bool(data.get("generated"), False)

        # Mark a set of properties as required.  AThis is applied only when an entity is created by the user
        self.required = ensure_list(data.get("required"))


        self.extends = set()
        self.schemata = set([self])
        self.names = set([self.name])
        self.descendants = set()
        self.properties = {}
        for name, prop in data.get("properties", {}).items():
            self.properties[name] = Property(self, name, prop)

    def generate(self):
        log.warning("GENERATE GETS CALLED {}".format(self.name))
        for parent in ensure_list(self.data.get("extends")):
            log.warning("GENERATE GETS CALLED {}".format("FROM PARENT LOOP"))
            parent = self.model.get(parent)
            parent.generate()

            for name, prop in parent.properties.items():
                if name not in self.properties:
                    self.properties[name] = prop

            self.extends.add(parent)
            for ancestor in parent.schemata:
                self.schemata.add(ancestor)
                self.names.add(ancestor.name)
                ancestor.descendants.add(self)

        for prop in list(self.properties.values()):
            prop.generate()

        for required in self.required:
            if self.get(required) is None:
                raise InvalidModel("Missing required property: %s" % required)

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

    @property
    def plural(self):
        return gettext()

    @property
    def description(self):
        return gettext(self._description)

    def is_a(self, parent):
        return parent in self.schemata

    def get(self, name):
        return self.properties.get(name)

    def validate(self, data):
        """
        Validate a dataset against the given schema.  This will also drop keys which are not present as properties
        """
        errors = {}
        properties = ensure_dict(data.get("properties"))
        for name, prop in self.properties.items():
            values = ensure_list(prop)
            error = prop.validate(values)
            if error is None and not len(values):
                if prop.name in self.required:
                    error = gettext("Required")
            if error is not None:
                errors[name] = error

        if len(errors):
            msg = gettext("Entity validation failed")
            raise InvalidData(msg, errors={"properties": errors})

    def to_dict(self):
        data = {
            "label": self.label,
            "schemta": list(sorted(self.names)),
            "properties": {}
        }
        for name, prop in self.properties.items():
            if prop.schema == self:
                data["properties"][name] = prop.to_dict()
        return data

    def __eq__(self, other):
        return hash(other) == hash(self)

    def __lt__(self, other):
        return self.name.__lt__(other.name)

    def __hash__(self):
        return hash(self.name)

    def __repr__(self):
        return "Schema(%r)>" % self.name