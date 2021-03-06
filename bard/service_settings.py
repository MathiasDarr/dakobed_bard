import os
import multiprocessing


REDIS_URL = os.getenv("REDIS_URL")
REDIS_SHORT  = 84700
REDIS_LONG = REDIS_SHORT * 200
REDIS_EXPIRE = int(os.getenv("REIDS_EXPIRE", REDIS_SHORT * 7))
REDIS_PREFIX = "sla"

TAGS_DATABASE_URI  = os.getenv("TAGS_DATABASE_URI", "sqlite://")

# Worker
WORKER_RETRY = int(os.getenv("WORKER_RETRY", 3))
WORKER_THREADS = int(os.getenv("WORKER_THREADS", multiprocessing.cpu_count()))
WORKER_REPORTING = bool(os.getenv("WORKER_REPORTING", True))


# Logging
LOG_FORMAT = os.getenv("LOG_FORMAT", "text") # options are: TEXT or JSON



ARCHIVE_TYPE = os.getenv("ARCHIVE_TYPE", "file")
ARCHIVE_BUCKET = os.getenv("ARCHIVE_BUCKET")
ARCHIVE_PATH = os.getenv("ARCHIVE_PATH")
