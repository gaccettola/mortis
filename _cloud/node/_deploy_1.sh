#!/usr/bin/env bash

# glaccn0
# glaccn1

SERVER_NAME=glaccn1
SOURCE_DIST=${HOME}/_Main/_Development/_mortis/server_restapi/source/
TARGET_DEST=/home/xavier/mortis

# node stop
echo node stopping...
ssh $SERVER_NAME 'bash -s' < node_stop.sh
echo node stopped.

# clear tmp
echo Clearing tmp - HOME/mortis ...
ssh $SERVER_NAME 'bash -s' < clear_tmp.sh
echo tmp cleared.

# transfer source
echo source transferring ...
rsync -rvzq -e 'ssh' $SOURCE_DIST $SERVER_NAME:$TARGET_DEST
echo source transferred ...

# env patch
echo patching dot env ...
ssh $SERVER_NAME 'bash -s' < env_patch.sh
echo dot env patched.

# node start
echo node starting...
ssh $SERVER_NAME 'bash -s' < node_start.sh
echo node started.

