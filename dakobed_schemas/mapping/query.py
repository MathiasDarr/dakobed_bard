from dakobed_schemas.exc import InvalidMapping

class QueryMapper(object):
    def __init__(self, model, data, key_prefix=None):
        self.model = model
        self.data = data
        self.refs = set()
        self.entities = []


    @property
    def source(self):
        return InvalidMapping("Cannot determine mapping type")

    def map(self, record):
        data = {}
        for entity in self.entities:
            mapped = entity.map(record, data)
            if mapped is not None:
                data[entity.name] = mapped
        return data