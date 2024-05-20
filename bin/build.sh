#!/bin/bash

# Check if a folder path is provided as parameter
if [ "$1" == "--clean" ]; then
    # Remove database
    ./bin/prune.sh -db
fi

# Bring up Hasura service
sudo docker compose up -d --build postgres
sudo docker compose up -d --build bdjuno
sudo docker compose up -d --build hasura

# Sleep for 30 seconds
sleep 30s

# Check if Hasura service is running
if sudo docker compose ps | grep -q "hasura"; then
    echo "Hasura service is up. Applying metadata changes..."
    # Apply metadata changes
    sudo docker exec -it hasura hasura metadata apply
else
    echo "Hasura service is not running. Metadata changes not applied."
    exit 1
fi
