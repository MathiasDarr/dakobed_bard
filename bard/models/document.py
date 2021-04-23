import cgi
import logging
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm.attributes import flag_modified
from normality import slugify


from bard.core import db


class Document(db.Model):
    id = db.Column(
        db.BigInteger,
        primary_key=True,
        nullable=False,
        unique=False
    )

    data = db.Column("data", JSONB)

