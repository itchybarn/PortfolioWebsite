#!/bin/bash

# FILE SHOULD BE SOURCED, NOT EXECUTED.
# Exit on error.
set -e

# Default ENV if not set
ENV="${ENV:-prod}"
ENV_FILE="/etc/portfolio/env"

# Select branch based on ENV
if [ "$ENV" = "prod" ]; then
    BRANCH="main"
else
    BRANCH="dev"
fi