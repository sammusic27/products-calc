const webpackConfCommon = require('./webpack/webpack.common');

module.exports = Object.assign(webpackConfCommon, {
  watch: false,
  mode: 'production'
});