from bard import service_settings
from bard.servicelayer.archive.file_archive import FileArchive

ARCHIVE_FILE = "file"
ARCHIVE_S3 = "s3"
ARCHIVE_GS = "gs"

def init_archive(
        archive_type= service_settings.ARCHIVE_TYPE,
        path = service_settings.ARCHIVE_PATH,
):
    if archive_type == ARCHIVE_S3:
        return
    return FileArchive(path=path)