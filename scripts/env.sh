#!/bin/bash

# FILE SHOULD BE SOURCED, NOT EXECUTED.

# Default ENV if not set
ENV="${ENV:-prod}"
ENV_FILE="/etc/portfolio/env"

# Select branch based on ENV
if [ "$ENV" = "prod" ]; then
    BRANCH="main"
else
    BRANCH="dev"
fi