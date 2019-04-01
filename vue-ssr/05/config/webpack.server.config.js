const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const base = require('./webpack.base.config');
const router = require('../server/router.js');

const config = merge(base, {
  target: 'node',
  devtool: '#source-map',
  // entry: {
  //   server: path.resolve(__dirname, '../src/pages/home/entry-server.js')
  // },
  entry: entrys(),
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    //new VueSSRServerPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../src/pages/home/index.ssr.html'),
    //   filename: 'index.ssr.html',
    //   files: {
    //     js: 'client.bundle.js'
    //   },
    //   excludeChunks: ['server']
    // })
  ]
});

module.exports = config;

function entrys() {
  let entries = {};
  for(let pageName in router){
    entries[`${pageName}/server`] = path.resolve(__dirname, `../src/pages/${pageName}/entry-server.js`)
  }
  return entries;
}

for(let pageName in router){
  let SSRconf = {
    filename: `${pageName}/vue-ssr-server-bundle.json`
  }
  config.plugins.push(new VueSSRServerPlugin(SSRconf));
  
  let conf = {
    template: path.resolve(__dirname, `../src/pages/${pageName}/index.ssr.html`),
    filename: `${pageName}/index.ssr.html`,
    files: {
      js: `${pageName}/client.bundle.js`
    },
    excludeChunks: [`${pageName}/server`]
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

