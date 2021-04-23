import logging


log = logging.getLogger(__name__)

def upsert_document(data, collection):
    """
    Create or update an entity in the database.
    """
