from bard.util import ensure_list
from bard.dakobed_schemas.types.common import PropertyType


class Registry(object):
    """
    This registry keeps the processing helpers for all property types in the system.

    Clean, validate or format values of that type
    """
    def __init__(self):
        self.named = {}
        self.types = set()
        self.groups = {}

    def add(self, clazz):
        if not issubclass(clazz, PropertyType):
            return
        type_ = clazz()
        self.named[clazz.name] = type_
        self.types.add(type_)
        # if type_.matchable:
        #     self.matchable.add(type_)
        # if type_.pivot:
        #     self.pivotes.add(type_)
        # if type_.group is not None:
        #     self.groups[type_.group] = type_

    def get(self, name):
        """
        For a given property type name, get its handling object
        """
        if isinstance(name, PropertyType):
            return name
        return self.named.get(name)

    def get_types(self, names):
        names = ensure_list(names)
        return [self.get(n) for n in names if self.get(n) is not None]

    def __getattr__(self, name):
        return self.named[name]
