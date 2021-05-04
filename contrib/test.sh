#!/bin/sh

psql -c "DROP DATABASE IF EXISTS bard_test;"
psql -c "CREATE DATABASE bard_test;" $BARD_DATABASE_URI

nosetests --with-coverage --cover-package=bard --cover-erase