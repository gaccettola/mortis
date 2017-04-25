#!/usr/bin/env bash

mkdir -p ${HOME}/.npm-packages

NPM_PACKAGES="${HOME}/.npm-packages"
prefix=${HOME}/.npm-packages
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"

pm2 stop server_restapi

pm2 delete server_restapi

