#!/bin/bash

set -e

DEPLOY_FIRST="${DEPLOY_FIRST:-false}"

echo "---Starting setup---"

if [ "$EXTRA_DEPLOY" = "true" ]; then
    ./deploy.sh
fi

./bootstrap.sh
./create_env.sh
sudo ./start_systemd.sh
sudo ./setup_https.sh
./deploy.sh

echo "---Setup complete---"