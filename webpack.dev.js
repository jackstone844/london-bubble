/**
 * This is the development environment webpack config 
 * It uses webpack-merge to merge the common config with some additional development config
 */

const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
    contentBase: './dist'
    }
});