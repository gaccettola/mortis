#!/usr/bin/env bash


# #############################################################################
#
# setup the enviroment

export NPM_PACKAGES="${HOME}/.npm-packages"
export NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
export PATH="$PATH:$NPM_PACKAGES/bin"

unset MANPATH
export MANPATH="$NPM_PACKAGES/share/man:$MANPATH"

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