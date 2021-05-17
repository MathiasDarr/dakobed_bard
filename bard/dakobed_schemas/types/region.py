

from bard.dakobed_schemas.types.common import EnumType
# from bard.dakobed_schemas.utils import ge

class RegionType(EnumType):
    name = "location"

    def clean_text(self, region):
        code = region.lower().strip()
        if code in self.codes:
            return code
        if region is not None:
            return region.lower()