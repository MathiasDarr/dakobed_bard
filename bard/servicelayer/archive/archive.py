import abc

class Archive(object):
    __metaclass__ = abc.ABCMeta

    def upgrade(self):
        pass

    @staticmethod
    def archive_file(self, file_path, content_hash=None, mime_type=None):
        pass

    @staticmethod
    def load_file(self, content_hash, file_name=None, temp_path=None):
        pass

    @staticmethod
    def list_files(self, prefix=None):
        """
        List files in the archive within the given prefix.  Must return an iterator of content hash
        """
        pass

    @staticmethod
    def delete_file(self, content_hash):
        pass

    def cleanup_file(self, content_hash, temp_path=None):
        pass

    def generate_url(self, content_hash, file_name=None, mime_type=None, expire=None):
        return None