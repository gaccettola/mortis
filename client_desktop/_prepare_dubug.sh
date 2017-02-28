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

echo preparing client_mobile,

rm -rf ./debug

mkdir -p debug

cd source

cp -a . ../debug

cd ../debug

npm install

bower install

node ./gulp/start

cd ..