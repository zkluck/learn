const appEntry = require('./multipageWebpackConfig');
const webpack = require('webpack');

for (var page in appEntry) {
    webpack(appEntry[page].clientConfig, ()=>{});
    webpack(appEntry[page].serverConfig, ()=>{});
}