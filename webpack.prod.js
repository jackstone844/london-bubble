/**
 * This is Webpack config that will only be introduced to the common 
 * Webpack config during a prod build. It merges the prod specific Webpack 
 * config with the common Webpack config.
 */

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});