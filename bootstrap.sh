#!/bin/bash

# Exit on error
set -e

echo "---Starting bootstrap---"

APP_DIR="/home/ec2-user/portfolio"
VENV_DIR="$APP_DIR/.venv"
REPO_URL="https://github.com/itchybarn/PortfolioWebsite.git"

# ---------------------------------------- INSTALL PACKAGES ----------------------------------------
echo "---Installing packages---"

sudo yum update -y
sudo yum install -y git python3 python3-pip

# ---------------------------------------- CLONE REPOSITORY ----------------------------------------
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -d ".git" ]; then
    echo "---Cloning repository---"
    git clone "$REPO_URL" .
else
    echo "Repo already exists"
fi

# ---------------------------------------- CREATE VIRTUAL ENVIRONMENT ----------------------------------------
if [ ! -d "$VENV_DIR" ]; then
    echo "---Creating virtual environment---"
    python3 -m venv "$VENV_DIR"
else
    echo "Virtual environment already exists"
fi

source "$VENV_DIR/bin/activate"

# ---------------------------------------- INSTALL DEPENDENCIES ----------------------------------------
if [ -f "requirements.txt" ]; then
    echo "---Installing dependencies---"
    pip install -r requirements.txt
else
    echo "No requirements.txt file found"
fi

echo "---Bootstrap complete for $ENV---"