/**
 * This is the common webpack config that will be used to compile code for development and production
 * environments
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Set the paths to our files
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  HTML: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'src'),
};

// Config for the HTML plugin
// WebPack will inject the output in the body
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(paths.HTML, 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

// Config to clean the dist/ folder with each build 
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);

// Config for the CSS plug in
// Any CSS required in index.js will be compiled
// in the bundle
const ExtractTextPluginConfig = new ExtractTextPlugin('styles_bundle.css');

module.exports = {

    // WebPack entry
    entry: path.join(paths.JS, 'index.js'),
    
    // WebPack JS output
    output: {
        path: paths.DIST,
        filename: '[name].bundle.js'
    },

    // Loader rules for processing the different
    // files required in index.js
    module: {
        rules: [
            { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ },
            { test: /\.jsx$/, use: [ 'babel-loader' ], exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'css-loader', 'style-loader' ) },
            { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, use: [ 'url-loader?limit=100000' ] },
            { test: /\.(eot|ttf|wav|mp3)$/, use: [ 'file-loader' ] }
        ]
    },
    
    // Call both plugin configs
    plugins: [
        CleanWebpackPluginConfig,
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig
    ],

    // Automatically resolve extensions js and jsx
    resolve: {
        extensions: ['.js', '.jsx'],
    },

};