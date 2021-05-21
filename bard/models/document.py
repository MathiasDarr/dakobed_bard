from bard.models.common import DatedModel
from bard.models.collection import Collection
from bard.core import db
from dakobed_schemas.utils import sanitize_text



class Document(db.Model, DatedModel):
    id = db.Column(db.BigInteger, primary_key=True)
    collection_id = db.Column(
        db.Integer, db.ForeignKey("collection.id"), nullable=False, index=True
    )
    collection = db.relationship(
        Collection, backref=db.backref("documents",lazy="dynamic")
    )

    @classmethod
    def by_collection(cls, collection_id=None):
        q = cls.all()
        q = q.filter(cls.collection_id == collection_id)
        q.yield_per(5000)
        return q

    @classmethod
    def save(cls, collection, foreign_id=None):
        # foreign_id = sanitize_text(foreign_id)
        q = cls.all()
        q = q.filter(Document.collection_id == collection.id)

        document = q.first()
        if document is None:
            document = cls()
            document.collection_id = collection.id
            # document.foreign_id = foreign_id
        db.session.add(document)
        return document