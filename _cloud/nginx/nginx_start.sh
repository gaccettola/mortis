#!/usr/bin/env bash

sudo chown -R nginx:nginx /var/www/data/accettolasystems.com
sudo chmod -R 755 /var/www/data/accettolasystems.com

sudo service nginx start

