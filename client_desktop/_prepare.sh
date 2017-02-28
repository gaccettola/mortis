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

echo preparing client_desktop,

rm -rf ./debug

mkdir -p debug

cd source

cp -a . ../debug

cd ../debug

cd app

npm install --no-optional

./node_modules/.bin/electron-rebuild -f

cd ..

npm install

# #############################################################################
#
# build

node ./gulp/build
