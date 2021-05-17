import os
from dakobed_schemas.model import Model
from dakobed_schemas.utils import set_model_locale

# model_path = os.path.dirname(__file__)
model_path = os.getcwd()
model_path = os.path.join(model_path, "dakobed_schemas/schema")
# model_path = os.environ.get("DAKOBED_SCHEMA_MODEL_PATH", model_path)

model = Model(model_path)

__all__ = ["model", "set_model_locale"]