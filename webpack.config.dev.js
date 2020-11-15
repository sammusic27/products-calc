const merge = require('lodash/merge');
const webpackConfCommon = require('./webpack/webpack.common');

module.exports = merge(webpackConfCommon, {
  watch: true,
  mode: 'development'
});