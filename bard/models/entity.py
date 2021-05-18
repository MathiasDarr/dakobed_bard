import logging
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB


from dakobed_schemas import model
from dakobed_schemas.types import registry
from dakobed_schemas.exc import InvalidData

from bard.core import db
from bard.models.common import DatedModel
from bard.models.common import iso_text, make_textid, ENTITY_ID_LEN
from bard.models import Collection

log = logging.getLogger(__name__)


class Entity(db.Model, DatedModel):
    THING="Thing"
    id = db.Column(
        db.String(ENTITY_ID_LEN),
        primary_key=True,
        default=make_textid,
        nullable=False,
        unique=False
    )
    schema = db.Column(db.String(255), index=True)
    data = db.Column("data", JSONB)

    collection_id = db.Column(db.Integer, db.ForeignKey("collection.id"), index=True)
    collection = db.relationship(
        Collection, backref=db.backref("entities", lazy="dynamic")
    )

    @property
    def model(self):
        return model.get(self.schema)

    def update(self, data, collection):
        self.updated_at = datetime.utcnow()
        db.session.add(self)

    def to_proxy(self):
        data = {
            "id": self.id,
            "schema": self.schema,
            "properties": self.data,
            "created_at": iso_text(self.created_at)
        }
        return model.get_proxy(data, cleaned=False)

    @classmethod
    def create(cls, data, collection):
        entity = cls()
        entity.collection_id = collection.id
        entity.update(data, collection)
        return entity

    @classmethod
    def by_id(cls, entity_id, collection=None):
        q = cls.all().filter(cls.id == entity_id)
        if collection is not None:
            q = q.filter(cls.collection_id == collection.id)
        return q.first()

    @classmethod
    def by_collection(cls, collection_id):
        q = cls.all()
        q = q.filter(Entity.collection_id == collection_id)
        q = q.yield_per(5000)
        return q

    @classmethod
    def delete_by_collection(cls, collection_id):
        pq = db.session.query(cls)
        pq = pq.filter(cls.collection_id == collection_id)
        pq.delete(synchronize_session=False)

    def __repr__(self):
        return "<Entity(%r, %r>" % (self.id, self.schema)

