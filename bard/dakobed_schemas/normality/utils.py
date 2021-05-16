
from bard.util import DEFAULT_ENCODING
from bard.dakobed_schemas.normality.stringify import stringify
from typing import Any, Dict, Optional

Categories = Dict[str, Optional[str]]
Encoding = str


def is_text(data: Any) -> bool:
    return isinstance(data, str)


