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

./_prepare.sh

cd ./debug

# ionic serve

ionic serve --lab

# cordova platform rm ios
# cordova platform add ios
# ionic build ios
# ionic emulate ios

# cordova platform rm android
# cordova platform add android
# ionic build android
# ionic emulate android --client_mobile

# ionic run android