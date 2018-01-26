/**
 * This is the common webpack config that will be used to compile code for development and production
 * environments. It provides the core functionality for the build process.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Set paths to the output folder, HTML files and JS files
 * @type {obj}
 */
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  HTML: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'src'),
};

/**
 * Webpack Plugin
 * Introduces the root html template and injects the bundle.js into the body
 * @type {class}
 */
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(paths.HTML, 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

/**
 * Webpack Plugin 
 * Clears the dist/ directory before each new build
 * @type {class}
 */
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);

/**
 * Webpack Plugin 
 * It moves all the required *.css modules in entry chunks into 
 * a separate CSS file. So your styles are no longer inlined 
 * into the JS bundle, but in a separate CSS file (styles_bundle.css)
 * This is used as the loader for css within the Webpack module
 * @type {class}
 */
const ExtractTextPluginConfig = new ExtractTextPlugin('styles_bundle.css');

/**
 * Main Webpack module
 */
module.exports = {

    /**
     * Sets the entry point as our index.js file
     */
    entry: path.join(paths.JS, 'index.js'),
    
    /**
     * Sets the compiled output to be placed in the dist/ directory
     */
    output: {
        path: paths.DIST,
        filename: '[name].bundle.js'
    },

    /**
     * Sets Loaders to transform the source code
     */
    module: {
        rules: [
            { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ },
            { test: /\.jsx$/, use: [ 'babel-loader' ], exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract( 'css-loader', 'style-loader' ) },
            { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, use: [ 'url-loader?limit=100000' ] },
            { test: /\.(eot|ttf|wav|mp3)$/, use: [ 'file-loader' ] }
        ]
    },
    
    /**
     * Adds our plugins defined above
     */
    plugins: [
        CleanWebpackPluginConfig,
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig
    ],

    /**
     * Automatically resolve extensions js and jsx
     * so we don't need to use the extension when 
     * importing
     */
    resolve: {
        extensions: ['.js', '.jsx'],
    },

};