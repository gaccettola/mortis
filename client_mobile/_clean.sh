#!/usr/bin/env bash


# #############################################################################
#
# clean module

echo cleaning client_mobile,

rm -rf ./debug
rm -rf ./release

cd source

rm -rf ./platforms/android

rm -rf ./platforms/browser

rm -rf ./plugins/cordova*/
rm -rf ./plugins/ionic*/

rm -rf ./node_modules
rm -rf ./www/assets
rm -rf ./www/build
rm -rf ./www/*.*
