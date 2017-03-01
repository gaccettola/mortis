#!/usr/bin/env bash


# #############################################################################
#
# clean module

echo cleaning server_update,

rm -rf ./source/node_modules

rm -rf ./debug
rm -rf ./release

mkdir -p ./debug/
mkdir -p ./release/