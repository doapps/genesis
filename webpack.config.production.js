'use strict';

var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' );
var config = require( './webpack.config.base.js' );

var SaveAssetsJson = require( 'assets-webpack-plugin' );

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './__site__',
  pathInfo: true,
  publicPath: '',
  filename: 'bundle.[hash].min.js'
};

config.plugins = config.plugins.concat( [
  new webpack.optimize.OccurenceOrderPlugin( true ),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin( {
    output: { comments: false },
    compress: {
      warnings: false,
      screw_ie8: true
    }
  } ),
  new SaveAssetsJson( {
    path: process.cwd(),
    filename: 'assets.json'
  } ),
  new webpack.DefinePlugin( { 'process.env': { NODE_ENV: JSON.stringify( 'production' ) } } ),
  new CopyWebpackPlugin( [
    { from: './static-files/util.js' },
  ] ),
  new HtmlWebpackPlugin( {
    title: 'Genesis',
    filename: 'index.html',
    favicon: './static-files/favicon.ico',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    },
    template: './static-files/index.html'
  } ),
  new HtmlWebpackPlugin( {
    title: 'GitLab Login',
    filename: 'gitlab.html',
    favicon: './static-files/favicon.ico',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    },
    template: './static-files/gitlab.html'
  } ),
  new HtmlWebpackPlugin( {
    title: 'Slack Auth',
    filename: 'slack-wrapper.html',
    favicon: './static-files/favicon.ico',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    },
    template: './static-files/slack-wrapper.html'
  } ),
] );

config.module.loaders = config.module.loaders.concat( [
  {
    test: /\.jsx?$/,
    loaders: [ 'babel' ],
    exclude: /node_modules/
  }
] );

module.exports = config;
