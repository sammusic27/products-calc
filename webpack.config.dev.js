const path = require('path');
const webpackConfCommon = require('./webpack/webpack.common');

module.exports = Object.assign(webpackConfCommon, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000
  }
});