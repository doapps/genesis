#!/bin/bash
set -e
PATH=$(npm bin):$PATH

rm -rf ./__site__
# ./build_helpers/buildAPIDocs.sh
cross-env NODE_ENV=production webpack -p --progress

# NODE_ENV=production webpack --config "$PWD/site/webpack-client.config.js"
# NODE_ENV=production webpack --config "$PWD/site/webpack-prerender.config.js"
# NODE_ENV=production ./build_helpers/buildSiteIndexPages.sh
