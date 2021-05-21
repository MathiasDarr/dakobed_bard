from bard.core import db
from bard.models.common import IdModel, DatedModel, make_textid, SoftDeleteModel
from dakobed_schemas.normality import stringify
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB
import logging

log = logging.getLogger(__name__)


class Collection(db.Model, IdModel, SoftDeleteModel):
    label = db.Column(db.Unicode)
    foreign_id = db.Column(db.Unicode, unique=True, nullable=False)

    def touch(self):
        self.updated_at = datetime.utcnow()
        db.session.add(self)

    def update(self, data):
        self.label = data.get("label", self.label)
        log.info("I GET CALLED AND SELF.LABEL IS {}".format(self.label))
        self.touch()
        db.session.flush()

    @classmethod
    def create(cls, data, created_at=None):
        foreign_id = data.get("foreign_id") or make_textid()
        collection = cls.by_foreign_id(foreign_id, deleted=True)
        if collection is None:
            collection = cls()
            collection.created_at = created_at
            collection.foreign_id = foreign_id
        collection.update(data)
        collection.deleted_at = None
        return collection

    def to_dict(self):
        data = self.to_dict_dates()
        data.update(
            {
                "id": stringify(self.id),
                "collection_id": stringify(self.id),
                "foreign_id": self.foreign_id
            }
        )
        return data

    @classmethod
    def by_foreign_id(cls, foreign_id, deleted=False):
        if foreign_id is None:
            return
        q = cls.all(deleted=deleted)
        return q.filter(cls.foreign_id == foreign_id).first()

    def __repr__(self):
        return '<Collection %r>' % self.label

    def __str__(self):
        return self.foreign_id


# class Collection(db.Model, DatedModel, IdModel):
#     label = db.Column(db.Unicode)
#     summary = db.Column(db.Unicode, nullable=True)
#     foreign_id = db.Column(db.Unicode, unique=True, nullable=False)
#
#     def touch(self):
#         self.updated_at = datetime.utcnow()
#         db.session.add(self)
#
#     def update(self, data):
#         self.label = data.get("label", self.label)
#         self.summary = data.get("summary", self.summary)
#         self.touch()
#         db.session.flush()
#
#     @classmethod
#     def by_foreign_id(cls, foreign_id, deleted=False):
#         if foreign_id is None:
#             return
#         q = cls.all(deleted=deleted)
#         return q.filter(cls.foreign_id == foreign_id)
#
    # @classmethod
    # def create(cls, data, created_at=None):
#         # collection = cls()
#         # collection.created_at = created_at
#         # collection.foreign_id = make_textid()
#         # log.info("*****************************************************************************************")
#         # log.info("the foregin id is {}".format(collection.foreign_id))
#         # return collection
#
#         foreign_id = data.get("foreign_id") or make_textid()
#         collection = cls.by_foreign_id(foreign_id, deleted=True)
#
#         if collection is None:
#             collection = cls()
#             collection.created_at = created_at
#             collection.foreign_id = foreign_id
#         # db.session.add(collection)
#         collection.update(data)
#         return collection