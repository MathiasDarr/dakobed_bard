import logging
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

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

    collection_id = db.Column(db.Integer, db.ForeignKey("collection.id"), index=True)
    collection = db.relationship(
        Collection, backref=db.backref("entities", lazy="dynamic")
    )

    def update(self):
        self.updated_at = datetime.utcnow()
        db.session.add(self)

    @classmethod
    def create(cls):
        entity = cls()
        entity.collection_id = 1
        entity.update()
        return entity


    # schema = db.Column(db.String(255), index=True)
    # data = db.Column('data', JSONB)
    # collection_id = db.Column(db.Integer, db.ForeignKey("collection.id"), index=True)
    # collection = db.relationship(
    #     Collection, backref=db.backref("entities", lazy="dynammic")
    # )
    #
    # def update(self, data, collection, sign=True):
    #     db.session.add(self)
    #
    #
    #
    # @classmethod
    # def create(cls, data, collection, sign=True, role_id=None):
    #     entity=cls()
    #     entity_id= data.get("id") or make_textid()
    #     entity.collection_id = collection.id
    #     entity.update(data, collection, sign=sign)
    #     return collection
    #
    # @classmethod
    # def by_id(cls, entity_id, collection=None):
    #     q = cls.all().filter(cls.id == entity_id)
    #     if collection is not None:
    #         q = q.filter(cls.collection_id == collection.id)
    #     return q.first()
    #
    # @classmethod
    # def delete_by_collection(cls, collection_id):
    #     pq = db.session.query(cls)
    #     pq = pq.filter(cls.collection_id == collection_id)
    #     pq.delete(synchronize_session=False)
    #
    # def __repr__(self):
    #     return "<Entity(%r, %r>" % (self.id, self.schema)
    #
    #
