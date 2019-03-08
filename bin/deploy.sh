#!/bin/bash

source ~/scripts/shell/deploy-helpers.sh

set -ex

# create temp directory for rsync contents
mkdir tmp

# add files to the temp directory
cp -r js resources favicon.ico index.* tmp/

# sync the files to the web host
rsync_giantfuckingeagle_com_dir tmp/

# remove the temp directory
rm -rf tmp
