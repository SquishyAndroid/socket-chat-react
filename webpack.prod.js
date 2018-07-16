const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
            uglifyOptions: {
                compress: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});

