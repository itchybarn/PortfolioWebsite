#!/bin/bash

set -e

echo "---Starting setup---"

./bootstrap.sh
sudo ./setup_systemd.sh
sudo ./deploy.sh

echo "---Setup complete---"