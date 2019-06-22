/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/index-team'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle-team.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.NamedModulesPlugin()
  ],
  node: {
      fs: 'empty'
  }
}
