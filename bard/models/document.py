import cgi
import logging
from dakobed_schemas.utils import is_mapping, ensure_list
from dakobed_schemas.normality import slugify
from bard.models.common import DatedModel
from bard.models.collection import Collection
from bard.core import db
from dakobed_schemas.utils import sanitize_text
from dakobed_schemas.types import registry
from dakobed_schemas import model
from dakobed_schemas.utils import sanitize_text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm.attributes import flag_modified


log = logging.getLogger(__name__)


class Document(db.Model, DatedModel):
    id = db.Column(db.BigInteger, primary_key=True)
    content_hash = db.Column(db.Unicode(65), nullable=True, index=True)
    foreign_id = db.Column(db.Unicode, unique=False, nullable=True, index=True)

    collection_id = db.Column(
        db.Integer, db.ForeignKey("collection.id"), nullable=False, index=True
    )
    collection = db.relationship(
        Collection, backref=db.backref("documents",lazy="dynamic")
    )

    @property
    def model(self):
        return model.get(self.schema)

    @classmethod
    def by_content_hash(cls, content_hash):
        q = cls.all()
        return q.filter(cls.content_hash == content_hash)

    @classmethod
    def by_collection(cls, collection_id=None):
        q = cls.all()
        q = q.filter(cls.collection_id == collection_id)
        q.yield_per(5000)
        return q

    @classmethod
    def save(cls,
             collection,
             foreign_id=None,
             content_hash=None
    ):

        log.warning("")
        foreign_id = sanitize_text(foreign_id)
        q = cls.all()
        q = q.filter(Document.collection_id == collection.id)

        if foreign_id is not None:
            q = q.filter(Document.foreign_id == foreign_id)
        elif content_hash is not None:
            q = q.filter(Document.content_hash == content_hash)
        else:
            raise ValueError("No unique criterion for document")

        document = q.first()
        if document is None:
            document = cls()
            document.collection_id = collection.id
            document.content_hash = content_hash
            document.foreign_id = foreign_id
        db.session.add(document)
        return document

