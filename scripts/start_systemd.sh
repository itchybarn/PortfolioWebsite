#!/bin/bash

# Exit on error
set -e

echo "---Starting systemd setup---"

sudo cp /home/ec2-user/portfolio/portfolio.service /etc/systemd/system/portfolio.service

sudo cp /home/ec2-user/portfolio/nginx/portfolio.conf /etc/nginx/conf.d/portfolio.conf
sudo systemctl enable --now nginx
sudo nginx -t
sudo systemctl reload nginx

sudo systemctl daemon-reload
sudo systemctl enable --now portfolio.service

echo "---Systemd setup complete---"
