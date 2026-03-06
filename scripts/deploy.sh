#!/bin/bash

# Exit on error
set -e

APP_DIR="/home/ec2-user/portfolio"
source "env.sh"

cd "$APP_DIR"

# Updates Git's knowledge of the remote repository
git fetch origin

# Switch working directory to the dev branch
git checkout "$BRANCH"

# Pull the latest changes from the dev branch
git pull origin "$BRANCH"

APP_DIR="$APP_DIR" ENV="$ENV" "./scripts/deploy_run.sh"
