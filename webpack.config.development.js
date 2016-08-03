'use strict';

var webpack = require( 'webpack' );
var config = require( './webpack.config.base.js' );

if ( process.env.NODE_ENV !== 'test' ) {
  config.entry = [ 'webpack-dev-server/client?http://localhost:3000' ].concat( config.entry );
}

// config.devtool = 'cheap-module-eval-source-map';
config.devtool = '#eval';

config.module.loaders = config.module.loaders.concat( [
  {
    test: /\.jsx?$/,
    loaders: [ 'babel' ],
    exclude: /node_modules/
  }
] );

module.exports = config;
