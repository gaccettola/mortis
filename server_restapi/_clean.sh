#!/usr/bin/env bash


# #############################################################################
#
# clean module

echo cleaning server_restapi,

rm -rf ./source/node_modules

rm -rf ./debug
rm -rf ./release

mkdir -p ./debug/
mkdir -p ./release/

mkdir -p ./debug/common/
mkdir -p ./release/common/