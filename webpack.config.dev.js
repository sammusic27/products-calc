const webpackConfCommon = require('./webpack/webpack.common');

module.exports = Object.assign(webpackConfCommon, {
  watch: true,
  mode: 'development'
});