#!/usr/bin/env bash


# #############################################################################
#
# clean module

echo cleaning client_web,

rm -rf ./node_modules
rm -rf ./dist

cd source/app

find . -name "*.js" -delete
find . -name "*.map" -delete

cd ..
