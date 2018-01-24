/**
 * This is the production environment webpack config 
 * It uses webpack-merge to merge the common config with some minification
 */

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});