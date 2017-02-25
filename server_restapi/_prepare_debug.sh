#!/usr/bin/env bash


# #############################################################################
#
# setup the enviroment

NPM_PACKAGES="${HOME}/.npm-packages"
prefix=${HOME}/.npm-packages
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"
unset MANPATH
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"

# #############################################################################
#
# prepare module

echo preparing server_restapi,

mkdir -p ./debug/

cp ./source/.env ./debug/
cp -a ./source/* ./debug/

mkdir -p ./debug/common/

cp ../common/source/* ./debug/common/

cd debug

npm install

cd ..