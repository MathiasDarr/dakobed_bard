import logging
from enum import Enum
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

from dakobed_schemas.utils import stringify
from dakobed_schemas.utils import ensure_list

from bard.core import db
from bard.models import Collection
from bard.models.common import SoftDeleteModel
from bard.models.common import ENTITY_ID_LEN, make_textid, query_like

class EntitySet(db.Model, SoftDeleteModel):

    LIST = "list"
    PROFILE = "profile"
    TYPES = frozenset([LIST, PROFILE])

    id = db.Column(db.String(ENTITY_ID_LEN), primary_key=True)
    label = db.Column(db.Unicode)
    type = db.Column(db.String(10), index=True, default=LIST)
    # summary = db.Column(db.Unicode, nullable=True)
    # layout = db.Column("layout")
    #
    # collection_id = db.Column(db.Integer, db.ForeignKey("collection.id"), index=True)
    # collection = db.relationship(Collection)

    # @property
    # def entities(self):
    #     q = db.session.query()
    #
    #     pass

    @classmethod
    def create(cls, data, collection):
        entityset = cls()
        entityset.id = make_textid()
        return entityset

    @classmethod
    def by_type(cls, types):
        """
        Returns EntitySets of a particular type
        """
        q = EntitySet.all()
        types = ensure_list(types)
        if len(types) and types != cls.TYPES:
            q = q.filter(EntitySet.type.in_(types))
        return q
    #
    @classmethod
    def by_collection_id(cls, collection_id, types=None):
        """Returns EntitySets within a given collection_id"""
        q = cls.by_type(types)
        q = q.filter(EntitySet.collection_id == collection_id)
        return q


# class EntitySetItem(db.Model, SoftDeleteModel):
#     __tablename__ = "entityset_item"
#     id = db.Column(db.Integer, primary_key=True)
#     entityset_id = db.Column(
#         db.String(ENTITY_ID_LEN), index=True
#     )
#     entity_id = db.Column(db.String(ENTITY_ID_LEN))
#     collection_id = db.Column(db.Integer, db.ForeignKey("collection.id"))
#
#     entityset = db.relationship(EntitySet)
    # collection = db.relationship(Collection)


#     @classmethod
#     def delete_by_collection(cls, collection_id):
#         pq = db.session.query(cls)
#         pq = pq.filter(cls.collection_id == collection_id)
#         pq.delete(synchronize_session=False)
#
#         pq = db.session.query(cls)
#         pq = pq.filter(EntitySet.id == cls.entity_id)
#         pq.delete(synchronize_session=False)
#
#
#     @classmethod
#     def delete_by_entity(cls, entity_id):
#         pq = db.session.query(cls)
#         pq = pq.filter(cls.entity_id == entity_id)
#         pq.delete(synchronize_session=False)
#
#     def to_dict(self, entityset=None):
#         data = {
#             "id": "$".join((self.entityset_id, self.entity_id)),
#             "entity_id": self.entity_id,
#             "collection_id": self.collection_id,
#             "added_by_id": self.added_by_id,
#             "judgement": self.judgement,
#             "compared_to_entity_id": self.compared_to_entity_id
#         }
#         entityset = entityset or self.entityset
#         data["entityset_collection_id"] = entityset.collection_id
#         data["entityset_id"] = entityset.id
#         data.update(self.to_dict_dates())
#         return data
#
#
#     def __repr__(self):
#         return "<EntitySetItem(%r, %r)" % (self.entityset_id, self.entity_id)