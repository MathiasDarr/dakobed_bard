import logging
import warnings
from itertools import product

from dakobed_schemas.utils import ensure_dict
from dakobed_schemas.types import registry
from dakobed_schemas.exc import InvalidData
from dakobed_schemas.utils import sanitize_text, gettext, make_entity_id, value_list

class EntityProxy(object):
    """
    A wrapper object for an entity, with utility functions for the introspection and manipulation of its properties
    """

    __slots__ = ["schema", "id", "key_prefix", "context", "_properties", "_size"]

    def __init__(self, model, data, key_prefix=None, cleaned=True):
        data = dict(data)
        properties = data.pop("properties", {})
        if not cleaned:
            properties = ensure_dict(properties)
        self.schema = model.get(data.pop("schema", None))
        if self.schema is None:
            raise InvalidData(gettext("No schema for entity"))
        self.key_prefix = key_prefix

    def make_id(self, *parts):
        """
        Generates a unique ID for the given entity, composed of the given components, and the key_prefix
        """
        self.id = make_entity_id(*parts, key_prefix=self.key_prefix)
        return self.id

    def _prop_name(self, prop, quiet=False):
        if prop in self.schema.properties:
            return prop
        try:
            if prop.name in self.schema.properties:
                return prop.name
        except AttributeError:
            pass
        if quiet:
            return
        msg = gettext("Unknown property (%s): %s")
        raise InvalidData(msg % (self.schema, prop))

    def get(self, prop, quiet=False):
        prop = self._prop_name(prop, quiet=quiet)
        if prop not in self._properties:
            return []
        return list(self._properties.get(prop))

    def first(self, prop, quiet=False):
        for value in self.get(prop, quiet=quiet):
            return value

    def has(self, prop, quiet=False):
        prop = self._prop_name(prop, quiet=quiet)
        return prop in self._properties

    def add(self, prop, values, cleaned=False, quiet=False, fuzzy=False):
        prop_name = self._prop_name(prop, quiet=quiet)
        if prop_name is None:
            return
        prop = self.schema.properties[prop_name]

        if prop.stub:
            if quiet:
                msg = gettext("Stub property (%s): %s")
                raise InvalidData(msg % (self.schema, prop))

        for value in value_list(values):
            if not cleaned:
                value = prop.type.clean(value, proxy=self, fuzzy=fuzzy)
            if value is None:
                continue
            if prop.type == registry.entity and value == self.id:
                msg = gettext("Self-relationship (%s): %s")
                raise InvalidData(msg % (self.schema, prop))


            # Limit the maximum size of any particular field to avoid overloading upstream systems
            value_size = len(value)
            if prop.type.max_size is not None:
                if self._size + value_size > prop.type.max_size:
                    continue

            self._size += value_size
            self._properties.setdefault(prop_name, set())
            self._properties[prop_name].add(value)

    def set(self, prop, values, cleaned=False, quiet=False):
        """
        Replace the values of the property with the given value(s)
        """
        prop = self._prop_name(prop, quiet=quiet)
        if prop is None:
            return
        self._properties.pop(prop, None)
        return self.add(prop, values, cleaned=cleaned, quiet=quiet)

    def pop(self, prop, quiet=True):
        prop = self._prop_name(prop, quiet=quiet)
        if prop is None or prop not in self._properties:
            return []
        return list(self._properties.pop(prop))




    def __str__(self):
        return self.caption

    def __repr__(self):
        return "<E(%r,%r)>" % (self.id, str(self))

    def __hash__(self):
        if not self.id:
            warnings.warn(
                "Taking the hash of an EntityProxy without an ID set results in undefeined beahavior",
                RuntimeWarning
            )


    def __len__(self):
        return self._size