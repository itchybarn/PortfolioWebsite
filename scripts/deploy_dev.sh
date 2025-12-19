#!/bin/bash

set -e

RESTART="${RESTART:-false}"
SCRIPT_NAME="${SCRIPT_NAME:-deploy.sh}"

ssh dev "cd /home/ec2-user/portfolio/scripts && ENV=dev RESTART=$RESTART ./$SCRIPT_NAME"