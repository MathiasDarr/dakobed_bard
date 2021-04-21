from bard.views.collections_api import blueprint as collections_api
from bard.views.entities_api import blueprint as entities_api

def mount_app_blueprints(app):
    app.register_blueprint(collections_api)
    app.register_blueprint(entities_api)

    