import logging
from datetime import datetime
from bard.models.collection import Collection

from bard.core import db

log = logging.getLogger(__name__)

def create_collection(data):
    now = datetime.utcnow()
    collection = Collection.create(data,created_at=now)
    db.session.commit()
