#!/usr/bin/env bash


# #############################################################################
#
# clean module

echo cleaning client_desktop,

cd source

rm -rf ./node_modules
rm -rf ./dist

mkdir -p dist

