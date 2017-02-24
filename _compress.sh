#!/usr/bin/env bash


# #############################################################################
#
# compress the project, output to one directory above with a name of directory.datestring.whoami.tar.gz

echo
echo compressing modules ...

# get the source directory ( here )
PART_HERE=${PWD}

echo compressing from : ${PART_HERE}

# get a time-date string for a part of the compressed name, yyyy.mm.dd.hh.mm.ss
DATE_PART=$(date +'%Y.%m.%d.%H.%M.%S')

echo compressing date : ${DATE_PART}

# get the destination for the archive
PART_DEST=$PART_HERE/../

echo compressing dest : $PART_DEST

# get the name of the current directory
PART_BASE=${PWD##*/}
echo compressing base : $PART_BASE

# add them all up
PART_PATH=$(printf '%s%s.%s.%s.tar.gz' ${PART_DEST} ${PART_BASE} ${DATE_PART} $(whoami))

echo compressing path : $PART_PATH

# get the options for the tar
PART_FLAG='-zcf'

# tell tar to do a decent job of it all
export GZIP=-9

WHOLE_CMD=$(printf "tar %s %s %s" ${PART_FLAG} ${PART_PATH} ${PART_BASE})

echo compressing with : $WHOLE_CMD

# move up a directory and execute the command
cd ..
$WHOLE_CMD


echo