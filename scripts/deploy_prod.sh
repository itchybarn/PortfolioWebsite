#!/bin/bash

set -e

RESTART="${RESTART:-true}"
SCRIPT_NAME="${SCRIPT_NAME:-deploy.sh}"

ssh dev "ssh prod \"cd /home/ec2-user/portfolio/scripts && ENV=prod RESTART='${RESTART}' ./$SCRIPT_NAME\""