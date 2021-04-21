import logging
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from servicelayer.logs import configure_logging

NONE = "'none'"
log = logging.getLogger(__name__)
db = SQLAlchemy()


def create_app():
    configure_logging(level=logging.DEBUG)
    app = Flask("bard")

    from bard.views import mount_app_blueprints

    mount_app_blueprints(app)
    return app