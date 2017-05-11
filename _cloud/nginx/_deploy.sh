#!/usr/bin/env bash

SERVER_NAME=glacclb
SOURCE_DIST=${HOME}/_Main/_Development/_mortis/client_web/source/dist
TARGET_DEST=/home/xavier/mortis

# clear tmp
echo Clearing tmp - HOME/mortis ...
ssh $SERVER_NAME 'bash -s' < clear_tmp.sh
echo tmp cleared.

# transfer source
echo source transferring ...
rsync -rvzq -e 'ssh' $SOURCE_DIST $SERVER_NAME:$TARGET_DEST
echo source transferred ...

# nginx stop
echo nginx stopping...
ssh $SERVER_NAME 'bash -s' < nginx_stop.sh
echo nginx stopped.

# previous remove
echo removing previous html...
ssh $SERVER_NAME 'bash -s' < html_remove_old.sh
echo previous html removed.

# new html add
echo removing previous html...
ssh $SERVER_NAME 'bash -s' < html_add_new.sh
echo previous html removed.

# clear tmp ( again )
# echo Clearing tmp - HOME/mortis ...
# ssh $SERVER_NAME 'bash -s' < clear_tmp.sh
# echo tmp cleared.

# nginx start
echo nginx starting...
ssh $SERVER_NAME 'bash -s' < nginx_start.sh
echo nginx started.

