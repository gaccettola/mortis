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

rm -rf ./node_modules
rm -rf ./app/node_modules
rm -rf ./app/bower_components
rm -rf ./build/node_modules
rm -rf ./build/bower_components
rm -rf ./build
rm -rf ./releases
rm -rf ./tmp

cd app

npm install --no-optional

./node_modules/.bin/electron-rebuild -f

cd ..

npm install

# #############################################################################
#
# release

gulp release --env=production
