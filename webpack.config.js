const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  entry: './client/index.js',
  output: {
    path: './dist',
    filename: 'js/index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_KEY: JSON.stringify(process.env.API_KEY),
        SITE_ID: JSON.stringify(process.env.SITE_ID),
        FBAPIKEY: JSON.stringify(process.env.FBAPIKEY),
        FBAUTHDOMAIN: JSON.stringify(process.env.FBAUTHDOMAIN),
        FBDBURL: JSON.stringify(process.env.FBDBURL),
        FBSTORAGEBUCKET: JSON.stringify(process.env.FBSTORAGEBUCKET),
        FBMESSAGINGSENDERID: JSON.stringify(process.env.FBMESSAGINGSENDERID),
      },
    }),
    //new webpack.optimize.UglifyJsPlugin()
  ]
}
