#!/usr/bin/env bash

sudo chown -R www-data:www-data /var/www/accettolasystems.com
sudo chmod -R 755 /var/www/accettolasystems.com

sudo service nginx start

