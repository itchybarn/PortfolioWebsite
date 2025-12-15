#!/bin/bash

RESTART="${RESTART:-false}"

ssh dev "cd /home/ec2-user/portfolio/scripts; ENV=dev RESTART=$RESTART ./deploy.sh"