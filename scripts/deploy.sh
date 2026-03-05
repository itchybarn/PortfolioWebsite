#!/bin/bash

# Exit on error
set -e

echo "---Starting deployment---"

RESTART="${RESTART:-false}"
APP_DIR="/home/ec2-user/portfolio"
source "env.sh"

cd "$APP_DIR"

# Updates Git's knowledge of the remote repository
git fetch origin

# Switch working directory to the dev branch
git checkout "$BRANCH"

# Pull the latest changes from the dev branch
git pull origin "$BRANCH"

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

# Restart the service
if [ "$RESTART" = "true" ]; then
    sudo systemctl reload nginx
fi

echo "---Deployment complete---"