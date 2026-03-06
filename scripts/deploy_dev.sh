#!/bin/bash

set -e

SCRIPT="${SCRIPT:-deploy.sh}"

ssh dev "cd /home/ec2-user/portfolio/scripts && ENV=dev ./$SCRIPT"