from typing import Any, Optional
from decimal import Decimal
from datetime import datetime, date

DEFAULT_ENCODING = 'utf-8'
def stringify(value: Any, encoding_default: str = DEFAULT_ENCODING, encoding: Optional[str] = None):
    if value is None:
        return None
    if not isinstance(value, str):
        if isinstance(value, (date, datetime)):
            return value.isoformat()
        elif isinstance(value, (float, Decimal)):
            return Decimal(value).to_eng_string()
        else:
            value = str(value)

    value = value.strip()
    if not len(value):
        return None
    return value