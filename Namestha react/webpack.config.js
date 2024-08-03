const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
      index: './src/main.jsx',
    },
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    }, 
    module: {
           rules: [
            {
                test: /\.(js.|jsx$)/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader'
                }
            }
           ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src')
        },
        compress: true,
        port: 8089
    }
};