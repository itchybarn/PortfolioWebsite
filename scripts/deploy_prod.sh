#!/bin/bash

source "env.sh"

RESTART="${RESTART:-false}"

if [ "$ENV" == "dev" ]; then
    ssh dev "cd /home/ec2-user/portfolio/scripts; ENV=dev RESTART=$RESTART ./deploy_prod.sh"
else
    ssh prod "cd /home/ec2-user/portfolio/scripts; ENV=prod RESTART=$RESTART ./deploy.sh"
fi