/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

const babel = require('./webpack/babel');
const cssExtract = require('./webpack/css.extract');
const css = require('./webpack/css');
const cssLint = require('./webpack/css.lint');
const devserver = require('./webpack/devserver');
const devtool = require('./webpack/devtool');
const fonts = require('./webpack/fonts');
const ico = require('./webpack/ico');
const images = require('./webpack/images');
const jsLint = require('./webpack/js.lint');

const common = merge([
  {
    context: path.join(__dirname, 'src'),
    entry: 'index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      chunkFilename: '[name].chunk.js',
    },

    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        screens: path.resolve(__dirname, 'src/screens/')
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Test title app',
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'md4',
        hashDigest: 'base64',
        hashDigestLength: 8,
      }),
      new WebpackBar(),
    ],

    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
      },
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  // disabled because it does not allow reloading the page in development mode
  // jsLint(),
  // cssLint(),
  babel(),
  images(),
  fonts(),
  ico(),
]);

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return merge([
      common,
      cssExtract()
    ]);
  }

  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      css(),
      devtool(),
    ]);
  }
};
