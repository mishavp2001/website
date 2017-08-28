var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, "src"),
  entry: './index.jsx',
  output: {
    filename: 'app.js',
    publicPath: '/dist',
    path: path.resolve('dist')
  },
  resolveLoader: {
     extensions: ['.js', '.jsx', '.json'],
     // An array of directory names to be resolved to the current directory
     modules: ['node_modules', path.resolve(__dirname, "src")],
  },
  module: {
    rules: [
          {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
          },
          {
            test: /\.jsx?$/,
            use: [{
              loader: 'babel-loader'
            }]
          }
      ],
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader']},
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
      }
    ]
  },
  plugins: [
    // Add the HMR plugin
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new WebpackNotifierPlugin({ alwaysNotify: true })
  ]
};
