/**
 * This is Webpack config that will only be introduced to the common 
 * Webpack config during a dev build. It merges the dev specific Webpack 
 * config with the common Webpack config.
 */

const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
    contentBase: './dist'
    }
});