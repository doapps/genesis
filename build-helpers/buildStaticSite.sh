#!/bin/bash
set -e
PATH=$(npm bin):$PATH

rm -rf ./__site__
cross-env NODE_ENV=production webpack -p --progress
