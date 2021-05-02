#!/bin/bash

docker kill dakobed_bard_postgres_1 elasticsearch
docker system prune -f
docker volume prune -f