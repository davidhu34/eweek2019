var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index-dashboard'
  ],
  output: {
    path: path.join(__dirname, 'server'),
    filename: 'bundle-dash.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, 'src'),
      loader: require.resolve('babel-loader'),
    }]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
}
