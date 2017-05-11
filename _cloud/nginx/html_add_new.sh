#!/usr/bin/env bash

sudo chown -R xavier:xavier /var/www/accettolasystems.com
sudo chmod -R 755 /var/www/accettolasystems.com

# with trailing
sudo mkdir -p /var/www/accettolasystems.com/mortis/

sudo chown -R xavier:xavier /var/www/accettolasystems.com
sudo chmod -R 755 /var/www/accettolasystems.com

sudo mkdir -p ${HOME}/mortis/dist/
cd ${HOME}/mortis/dist/

# no trailing
cp -a . /var/www/accettolasystems.com/mortis

sudo chown -R www-data:www-data /var/www/accettolasystems.com

sudo chmod -R 755 /var/www/accettolasystems.com

