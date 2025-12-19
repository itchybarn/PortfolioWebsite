#!/bin/bash

set -e

echo "---Starting HTTPS setup---"

sudo certbot --nginx \
    -d itchybarn.com -d www.itchybarn.com \
    -d jackwagenheim.com -d www.jackwagenheim.com

sudo cp /home/ec2-user/portfolio/nginx/portfolio.conf /etc/nginx/conf.d/portfolio.conf

# Test for syntax errors in the nginx configuration, and then reload the nginx service to apply the changes without downtime.
sudo nginx -t
sudo systemctl reload nginx

sudo systemctl enable --now certbot-renew.timer

echo "---HTTPS setup complete---"