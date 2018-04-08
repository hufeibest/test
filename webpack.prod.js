import { HistoricalScheduler } from 'rx';

const webpack = require('webpack')
const path = require('path')

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
  entry: {
    hufei: '/app/index.html',
  },
  devtool: 'eval-source-map',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build')
  },
  devServer:{
    content: './index.html',
    historyApiFailback: true,
    inline: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['env']
      }
    }, {
      test: /\.(scss|css)$/,

      use: ExtractTextPlugin.extract({ 
                      use: [{
                        loader: "css-loader",
                        options: {
                          sourceMap: true
                        }
                      }, {
                        loader: "sass-loader",
                        options: {
                          sourceMap: true
                        }
                      }],
                      fallback: "style-loader"
                     })
    }]
  },

  plugins: [new UglifyJSPlugin(), new ExtractTextPlugin('style.css')]
}