from dakobed_schemas.types.registry import Registry
from dakobed_schemas.types.name import NameType
from dakobed_schemas.types.date import DateType
from dakobed_schemas.types.string import StringType
from dakobed_schemas.types.string import TextType
from dakobed_schemas.types.string import HTMLType
from dakobed_schemas.types.json import JsonType


registry = Registry()
registry.add(NameType)
registry.add(DateType)
registry.add(StringType)
registry.add(TextType)
registry.add(HTMLType)
registry.add(JsonType)

