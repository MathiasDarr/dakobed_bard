DOCKER_COMPOSE_FILE?=docker-compose.yaml

COMPOSE=docker-compose -f $(DOCKER_COMPOSE_FILE)
APPDOCKER=$(COMPOSE) run --rm app
DAKOBED_TAG=latest


all: build web

build:
	$(COMPOSE) build

shell: services
	$(APPDOCKER) /bin/bash

web: services
	$(COMPOSE) up api ui

services:
	$(COMPOSE) up -d --remove-orphans \
		$(SERVICES_CONTAINERS)



# clean:
#     find . -name '*.egg' -exec rm -f {} +

#     rm -rf dist build .eggs ui/build
#     find . -name '*.egg-info' -exec rm -f {} +
#     find . -name '*.pyc' -exec rm -f {} +
#     find . -name '*.pyo' -exec rm -f {} +
#     find . -type d -name __pycache__ -exec rm -rf {} \+
#     find ui/src -name '*.css' -exec rm -rf {} +

