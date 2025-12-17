#!/bin/bash

set -e

echo "---Starting setup---"

./bootstrap.sh
./create_env.sh
sudo ./start_systemd.sh
sudo ./setup_https.sh
./deploy.sh

echo "---Setup complete---"