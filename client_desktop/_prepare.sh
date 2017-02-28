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

echo preparing client_desktop,

cd source

# rm -rf ./source/node_modules/
# rm -rf ./source/app/node_modules/
# rm -rf ./source/app/bower_components
# rm -rf ./source/build/node_modules/
# rm -rf ./source/build/bower_components
# rm -rf ./source/build/
# rm -rf ./source/releases/
# rm -rf ./source/tmp/

cd app

npm install --no-optional

./node_modules/.bin/electron-rebuild -f

cd ..

npm install

# #############################################################################
#
# build

node ./gulp/build
