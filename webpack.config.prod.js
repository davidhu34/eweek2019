var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
