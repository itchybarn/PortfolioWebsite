#!/bin/bash

# Exit on error
set -e

echo "---Starting systemd setup---"
 
sudo systemctl daemon-reload
sudo systemctl enable portfolio.service
sudo systemctl start portfolio.service

echo "---Systemd setup complete---"
