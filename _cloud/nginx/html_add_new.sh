#!/usr/bin/env bash

sudo chown -R gabriel:gabriel /var/www/data/accettolasystems.com
sudo chmod -R 755 /var/www/data/accettolasystems.com

# with trailing
sudo mkdir -p /var/www/data/accettolasystems.com/mortis/

sudo chown -R gabriel:gabriel /var/www/data/accettolasystems.com
sudo chmod -R 755 /var/www/data/accettolasystems.com

sudo mkdir -p ${HOME}/mortis/dist/
cd ${HOME}/mortis/dist/

# no trailing
cp -a . /var/www/data/accettolasystems.com/mortis

sudo chown -R nginx:nginx /var/www/data/accettolasystems.com

sudo chmod -R 755 /var/www/data/accettolasystems.com

