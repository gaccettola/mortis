#!/usr/bin/env bash


# #############################################################################
#
# clean each of the modules

echo
echo cleaning modules ...

cd ./client_desktop/
./_clean.sh && cd ..

cd ./client_mobile/
./_clean.sh && cd ..

cd ./client_web/
./_clean.sh && cd ..

cd ./common/
./_clean.sh && cd ..

cd ./server_restapi/
./_clean.sh && cd ..

cd ./server_update/
./_clean.sh && cd ..

echo