#!/bin/bash

set -e

SCRIPT="${SCRIPT:-deploy.sh}"

ssh dev "ssh prod \"cd /home/ec2-user/portfolio/scripts && ENV=prod ./$SCRIPT\""