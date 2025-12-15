#!/bin/bash

set -e

echo "---Starting default file creation---"

source "env.sh"

# ---------------------------------------- ENV FILE ----------------------------------------
sudo mkdir -p /etc/portfolio

# Creates or overwrites the environment file with the default values.
# Redirects the output to /dev/null to avoid printing the file to the console.
sudo tee "$ENV_FILE" > /dev/null <<EOF
ENV=$ENV
PORT=8000
EOF

# Sets the owner and permissions of the environment file.
# Since systemd injects the environment file into the service, it needs to be owned by root and not readable by other users.
sudo chown root:root "$ENV_FILE"
sudo chmod 600 "$ENV_FILE"

echo "---Default file creation complete---"