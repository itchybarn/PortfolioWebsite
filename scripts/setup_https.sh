#!/bin/bash

set -e

echo "---Starting HTTPS setup---"

sudo certbot --nginx \
    -d itchybarn.com -d www.itchybarn.com \
    -d jackwagenheim.com -d www.jackwagenheim.com

sudo systemctl enable --now certbot-renew.timer

sudo systemctl reload nginx

echo "---HTTPS setup complete---"