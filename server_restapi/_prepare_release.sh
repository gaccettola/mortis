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

mkdir -p ./release/

cp ./source/.env ./release/
cp -a ./source/* ./release/

mkdir -p ./release/common/

cp ../common/source/* ./release/common/

cd release

npm install

cd ..