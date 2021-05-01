from bard.views.collections_api import blueprint as collections_api
from bard.views.entities_api import blueprint as entities_api
from bard.views.base_api import blueprint as base_api
from bard.views.upload_api import blueprint as upload_api


def mount_app_blueprints(app):
    app.register_blueprint(collections_api)
    app.register_blueprint(entities_api)
    app.register_blueprint(base_api)
    app.register_blueprint(upload_api, url_prefix="/api/2/collections")
    