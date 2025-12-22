#!/bin/bash

set -e

echo "---Starting HTTPS setup---"

source "env.sh"

sudo mkdir -p /var/www/html/.well-known/acme-challenge

if [ "$ENV" = "prod" ]; then
    sudo certbot certonly --webroot \
        -w /var/www/html \
        -d itchybarn.com -d www.itchybarn.com \
        -d jackwagenheim.com -d www.jackwagenheim.com \
        --deploy-hook "systemctl reload nginx" \
        --non-interactive --agree-tos --email itchybarn2@gmail.com --no-eff-email
        
    sudo cp /home/ec2-user/portfolio/nginx/portfolio.conf /etc/nginx/conf.d/portfolio.conf
else
    sudo certbot certonly --webroot \
        -w /var/www/html \
        -d dev.itchybarn.com \
        --deploy-hook "systemctl reload nginx" \
        --non-interactive --agree-tos --email itchybarn2@gmail.com --no-eff-email
        
    sudo cp /home/ec2-user/portfolio/nginx/portfolio_dev.conf /etc/nginx/conf.d/portfolio.conf
fi

# Test for syntax errors in the nginx configuration, and then reload the nginx service to apply the changes without downtime.
sudo nginx -t
sudo systemctl reload nginx

sudo systemctl enable --now certbot-renew.timer

echo "---HTTPS setup complete---"