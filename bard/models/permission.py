from bard.core import db
from bard.models.common import DatedModel, IdModel


class Permission(db.Model, DatedModel):
    """
    A set of rights granted to a role on a collection
    """

    __tablename__ = "permission"

    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.id"), index=True)
    read = db.Column(db.Boolean, default=False)
    write = db.Column(db.Boolean, default=False)
    collection_id = db.Column(db.Integer, nullable=False)