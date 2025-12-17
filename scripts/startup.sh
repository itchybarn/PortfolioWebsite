#!/bin/bash

set -e

echo "---Starting setup---"

./bootstrap.sh
./create_env.sh
./deploy.sh
sudo ./start_systemd.sh
sudo ./setup_https.sh

echo "---Setup complete---"