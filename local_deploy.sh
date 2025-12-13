#!/bin/bash

# If I didn't source the virtual environment, it would run as a subshell. Using source ensures the script runs in the current shell.
source ./virtual_env.sh

# Run the application
python src/app.py