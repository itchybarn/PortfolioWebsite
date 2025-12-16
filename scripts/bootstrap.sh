#!/bin/bash

# Exit on error
set -e

echo "---Starting bootstrap---"

APP_DIR="/home/ec2-user/portfolio"
REPO_URL="git@github.com:itchybarn/PortfolioWebsite.git"

source "env.sh"

# ---------------------------------------- INSTALL PACKAGES ----------------------------------------
echo "---Installing packages---"

sudo yum update -y
sudo yum install -y git python3 python3-pip nginx

# ---------------------------------------- INSTALL NGINX ----------------------------------------
sudo systemctl enable --now nginx

# ---------------------------------------- CLONE REPOSITORY ----------------------------------------
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -d ".git" ]; then
    echo "---Cloning repository---"
    git clone "$REPO_URL" .
else
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
fi

# ---------------------------------------- CREATE VIRTUAL ENVIRONMENT ----------------------------------------
if [ ! -d ".venv" ]; then
    echo "---Creating virtual environment---"
    python3 -m venv .venv
else
    echo "Virtual environment already exists"
fi

source ".venv/bin/activate"

echo "---Bootstrap complete for $ENV---"