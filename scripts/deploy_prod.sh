#!/bin/bash

set -e

RESTART="${RESTART:-false}"
SCRIPT="${SCRIPT:-deploy.sh}"

ssh dev "ssh prod \"cd /home/ec2-user/portfolio/scripts && ENV=prod RESTART='${RESTART}' ./$SCRIPT\""