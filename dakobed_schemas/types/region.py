from dakobed_schemas.types.common import EnumType


class RegionType(EnumType):
    name = "location"

    def clean_text(self, region):
        code = region.lower().strip()
        if code in self.codes:
            return code
        if region is not None:
            return region.lower()