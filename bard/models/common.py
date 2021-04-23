from bard.core import db
import uuid
import secrets
import logging
from sqlalchemy import false
from datetime import datetime, date
from flask_babel import lazy_gettext


def make_textid():
    return uuid.uuid4().hex


class IdModel(object):
    id = db.Column(db.Integer(), primary_key=True)


class DatedModel(object):
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    @classmethod
    def all(cls, deleted=False):
        return db.session.query(cls)


class SoftDeleteModel(DatedModel):
    deleted_at = db.Column(db.DateTime, default=None, nullable=True)

    def delete(self, deleted_at=None):
        self.deleted_at = deleted_at or datetime.utcnow()
        db.session.add(self)

    def to_dict_dates(self):
        data = super(SoftDeleteModel, self).to_dict_dates()
        if self.deleted_at:
            data["deleted_at"] = self.deleted_at
        return data


class Status(object):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    DEFAULT = PENDING

    LABEL = {
        PENDING: lazy_gettext("pending"),
        SUCCESS: lazy_gettext("successful"),
        FAILED: lazy_gettext("failed")
    }