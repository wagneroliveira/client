#!/bin/bash

docker build .
docker-compose -f docker-compose.yml up -d
