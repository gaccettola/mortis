#!/usr/bin/env bash


# #############################################################################
#
# prepare each of the modules

echo
echo preparing modules ...

cd ./client_desktop/
./_prepare.sh && cd ..

cd ./client_mobile/
./_prepare.sh && cd ..

cd ./client_web/
./_prepare.sh && cd ..

cd ./common/
./_prepare.sh && cd ..

cd ./server_database/
./_prepare.sh && cd ..

cd ./server_restapi/
./_prepare.sh && cd ..

cd ./server_update/
./_prepare.sh && cd ..

echo