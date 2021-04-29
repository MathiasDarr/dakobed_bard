# coding: utf-8
import json
import click
import logging
from pprint import pprint  # noqa
from flask.cli import FlaskGroup

from bard.models import Collection
from bard.migration import upgrade_system, destroy_db
from bard.core import create_app

log = logging.getLogger("bard")


@click.group(cls=FlaskGroup, create_app=create_app)
def cli():
    """Server-side command line for bard."""


@cli.command()
def collections():
    collections = []
    for coll in Collection.all():
        collections.append((coll.foreign_id, coll.id, coll.label))
    log.info("THE NUMBER OF COLLECTIONS IS {}".format(len(collections)))


@cli.command()
def upgrade():
    """Create or upgrade the search index and database."""
    log.info("DFADF ")
    upgrade_system()


@cli.command()
def evilshit():
    """EVIL: Delete all data and recreate the database."""
    destroy_db()
    upgrade()
