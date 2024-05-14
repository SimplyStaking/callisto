#!/bin/bash

# Bring up Hasura service
sudo docker compose up -d --build

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
