const path = require('path');
const webpackConfCommon = require('./webpack/webpack.common');

module.exports = Object.assign(webpackConfCommon, {
  watch: true,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3000
  }
});