#!/bin/bash

# Stop all services
sudo docker stop $(sudo docker ps -aq)

# Prune all
sudo docker system prune -a -f

# Check if a folder path is provided as parameter
if [ "$1" == "-db" ]; then
    # Remove database
    sudo rm -rf postgres-data/
fi