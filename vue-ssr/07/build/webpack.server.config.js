const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = merge(base, {
    target: 'node',
    devtool: '#source-map',
    output: {
        filename: `[name].[hash:8].js`,
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})
