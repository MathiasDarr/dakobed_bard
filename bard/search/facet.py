from bard.models import Collection


class Facet(object):
    def __init__(self, name):
        self.name = name

    def extract(self,aggregations, name, sub):
        if aggregations is None:
            return {}
        aggregations = aggregations.get("%s.filtered" % name, aggregations)
        data = aggregations.get("scoped", {}).get(name, {}).get(name)
        field = "%s.%s" % (name, sub)
        return data or aggregations.get(field, {})

    def expand(self, keys):
        pass

    def update(self, result, key):
        pass

    def to_dict(self):
        active = list(self.parser.filters.get(self.name, []))
        data = {"filters": active}
        return data


class CollectionFacet(Facet):
    def expand(self, keys):
        pass

    def update(self, result, key):
        pass