class DakobedSchemasException(Exception):
    pass

class InvalidData(DakobedSchemasException):
    def __init__(self, message, errors=None):
        super(InvalidData, self).__init__(message)
        self.errors = errors or {}

class InvalidModel(DakobedSchemasException):
    """
    Schema model is not defined correctly
    """
    pass

class InvalidMapping(DakobedSchemasException):
    """
    A data mappinbg was invalid
    """
    pass