from pathlib import Path


def ensure_path(file_path):
    if file_path is None or isinstance(file_path, Path):
        return file_path
    return Path(file_path).resolve()