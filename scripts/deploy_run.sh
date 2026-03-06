#!/bin/bash

# Exit on error
set -e

echo "---Starting deployment---"

APP_DIR="${APP_DIR:-/home/ec2-user/portfolio}"

source ".venv/bin/activate"

# Install the dependencies
if [ -f "requirements.txt" ]; then
    echo "---Installing dependencies---"
    pip install -r requirements.txt
else
    echo "No requirements.txt file found"
fi

cd "$APP_DIR/frontend"
npm install
npm run build

sudo systemctl restart portfolio.service
sudo cp "$APP_DIR/nginx/"*.conf /etc/nginx/conf.d/
sudo systemctl reload nginx

echo "---Deployment complete---"
