const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');
const router = require('../server/router.js');

const config = merge(base, {
  // entry: {
  //   client: path.resolve(__dirname, '../src/pages/home/entry-client.js')
  // },
  entry: entrys(),

  plugins: [
    //new VueSSRClientPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../src/pages/home/index.html'),
    //   filename: 'index.html'
    // })
  ]
});

module.exports = config;

for(let pageName in router){
  let SSRconf = {
    filename: `${pageName}/vue-ssr-client-manifest.json`
  }
  config.plugins.push(new VueSSRClientPlugin(SSRconf));

  let conf = {
    template: path.resolve(__dirname, `../src/pages/${pageName}/index.html`),
    filename: `${pageName}/index.html`
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

function entrys() {
  let entries = {};
  for(let pageName in router){
    entries[`${pageName}/client`] = path.resolve(__dirname, `../src/pages/${pageName}/entry-client.js`)
  }
  return entries;
}