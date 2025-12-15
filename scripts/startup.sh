#!/bin/bash

set -e

echo "---Starting setup---"

./bootstrap.sh
sudo ./start_systemd.sh
./deploy.sh

echo "---Setup complete---"