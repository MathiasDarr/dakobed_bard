from werkzeug.security import generate_password_hash, check_password_hash
from bard.core import db, settings
from bard.models.common import IdModel, SoftDeleteModel


class Role(db.Model, IdModel, SoftDeleteModel):
    __tablename__ = "role"
    USER = "user"
    GROUP = "group"
    SYSTEM = "system"
    TYPES = [USER, GROUP, SYSTEM]

    SYSTEM_GUEST = "guest"
    SYSTEM_USER = "user"

    foreign_id = db.Column(db.Unicode(2048), nullable=False, unique=True)
    name = db.Column(db.Unicode, nullable=False)
    type = db.Column(db.Enum(*TYPES, name="role_type"), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)
    password = None
    permissions = db.relationship("Permission",backref="role")


    @classmethod
    def by_foreign_id(cls, foreign_id, deleted=False):
        if foreign_id is not None:
            q = cls.all(deleted=deleted)
            q = q.filter(cls.foreign_id == foreign_id)
            return q.first()

    @classmethod
    def load_or_create(cls, foreign_id, type_, name, is_admin=None):
        role = cls.by_foreign_id(foreign_id)

        if role is None:
            role = cls()
            role.foreign_id = foreign_id
            role.name = name
            role.type = type_
            role.is_admin = False

        if is_admin is not None:
            role.is_admin = is_admin

        db.session.add(role)
        db.session.flush()
        return role

    @classmethod
    def load_cli_user(cls):
        return cls.load_or_create(
            settings.SYSTEM_USER, cls.USER, "Bard", is_admin=True
        )
