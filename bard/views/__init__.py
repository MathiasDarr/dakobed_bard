from bard.views.collections_api import blueprint as collections_api
from bard.views.entities_api import blueprint as entities_api
from bard.views.base_api import blueprint as base_api
from bard.views.upload_api import blueprint as upload_api
from bard.views.sessions_api import blueprint as sessions_api
from bard.views.roles_api import blueprint as roles_api
from bard.views.entitysets_api import blueprint as entitysets_api
from bard.views.ingest_api import blueprint as ingest_api

def mount_app_blueprints(app):
    app.register_blueprint(collections_api)
    app.register_blueprint(entities_api)
    app.register_blueprint(base_api)
    app.register_blueprint(upload_api, url_prefix="/api/2/collections")
    app.register_blueprint(sessions_api)
    app.register_blueprint(roles_api)
    app.register_blueprint(entitysets_api)
    app.register_blueprint(ingest_api)