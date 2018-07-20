const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV !== 'production';

const UglifyJsPluginConfig = new UglifyJsPlugin({
    test: /\.js($|\?)/i,
    sourceMap: true,
    uglifyOptions: {
        compress: true
    }
});

const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
});

module.exports = {
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/js/dist",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    mode: dev ? 'development' : 'production',
    plugins: dev ? [] : [ UglifyJsPluginConfig, DefinePluginConfig ],
    node: {
        __dirname: true
    },
    performance: { hints: false }
};
