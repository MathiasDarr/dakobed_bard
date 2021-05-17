from dakobed_schemas.normality.stringify import stringify
from typing import Any, Dict, Optional

Categories = Dict[str, Optional[str]]
Encoding = str
DEFAULT_ENCODING = 'utf-8'

def is_text(data: Any) -> bool:
    return isinstance(data, str)


