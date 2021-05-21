import os
import shutil
import glob
import logging
from pathlib import Path
from dakobed_schemas.normality import safe_filename
from bard.servicelayer.archive.archive import Archive
from bard.servicelayer.archive.util import BUF_SIZE, ensure_path, checksum
from bard.servicelayer.archive.util import path_prefix, path_content_hash


log = logging.getLogger(__name__)

class FileArchive(Archive):
    def __init__(self, path=None):
        log.warning("THE PATH LOOKS LIKE {}".format(path))
        self.path = ensure_path(path)
        log.warning("AFTER ENSURING PATH {}".format(self.path))

        if self.path is None:
            self.path = Path("/data")
        if self.path is None:
            raise ValueError("No archive path is set")
        log.info("Archive: %s", self.path)

    def _locate_key(self, content_hash):
        prefix = path_prefix(content_hash)
        if prefix is None:
            return
        path = self.path.joinpath(prefix)
        try:
            for file_name in path.iterdir():
                return file_name.resolve()
        except FileNotFoundError:
            return

    def archive_file(self, file_path, content_hash=None, mime_type=None):
        if content_hash is None:
            content_hash = checksum(file_path)

        if content_hash is None:
            return

        if self._locate_key(content_hash):
            return content_hash

        archive_prefix = path_prefix(content_hash)
        archive_path = self.path.joinpath(archive_prefix)
        archive_path.mkdir(parents=True, exist_ok=True)
        file_name = safe_filename(file_path, default="data")
        archive_path = archive_path.joinpath(file_name)
        with open(file_path, "rb") as fin:
            with open(archive_path, "wb") as fout:


                log.warning("THE FILE PATH IS {} AND THE ARCHIVE PATH IS {}".format(file_path, archive_path))
                shutil.copyfileobj(fin, fout, BUF_SIZE)
        return content_hash

    def load_file(self, content_hash, file_name=None, temp_path=None):
        return self._locate_key(content_hash)

    def list_files(self, prefix=None):
        prefix = path_prefix(prefix)
        if prefix is None:
            prefix = ""
        path = self.path.joinpath(prefix)
        if path.is_dir():
            path = f"{path}/**/*"
        else:
            path = f"{path}*/**/*"
        for file_path in glob.iglob(path, recursive=True):
            if os.path.isfile(file_path):
                yield path_content_hash(file_path)

    def delete_file(self, content_hash):
        prefix = path_prefix(content_hash)
        if prefix is None:
            return
        path = self.path.joinpath(prefix)
        try:
            for file_name in path.iterdir():
                return file_name.unlink()
        except FileNotFoundError:
            return