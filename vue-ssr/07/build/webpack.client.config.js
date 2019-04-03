const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const config = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: `vendor`,
            minChunks: function (module) {
                return (
                    /node_modules/.test(module.context) &&
                    !/\.css$/.test(module.request)
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: `manifest`  
        }),
    ]
})

module.exports = config
