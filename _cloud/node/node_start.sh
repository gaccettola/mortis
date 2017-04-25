#!/usr/bin/env bash

SERVER_DIR=/home/gabriel/mortis/

mkdir -p ${HOME}/.npm-packages

NPM_PACKAGES="${HOME}/.npm-packages"
prefix=${HOME}/.npm-packages
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"

cd ${SERVER_DIR}

rm -rf ${SERVER_DIR}/node_modules

npm i

pm2 start server_restapi.js

pm2 show server_restapi

pm2 logs server_restapi


