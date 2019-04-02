const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const router = require('./router.js');

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);

const createRenderer = (bundle, options) => createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false
}));

let render;
let rendererMap = {};
const templatePath = resolve('../web/tpl.html'); 
let baseRender = (renderer, pageName, req, res) => {
    let routeConfig = router[pageName];
    let context = {title: routeConfig.title};           //这个context同时会传递给entry-server，server里边可以注入数据，然后再交给模版
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log(err);   //如果entry-server返回的是promise，那么err就是reject的内容
            res.status(500).end('Internal Server Error');
            return
        }
        res.send(html);
        res.end();
    });
};

if (isProd) {
    const uniTpl = fs.readFileSync(templatePath, 'utf-8');
    let template = null;
    for (let pageName in router) {
        if(router[pageName].template) {
            template = fs.readFileSync(router[pageName].template, 'utf-8');
        } else {
            template = uniTpl;
        }
        const bundle = require(`../dist/server/${pageName}/vue-ssr-server-bundle.json`);
        const clientManifest = require(`../dist/server/${pageName}/vue-ssr-client-manifest.json`);
        rendererMap[pageName] = createRenderer(bundle, {
            template,
            clientManifest
        });
    }
    render = (pageName, req, res) => {
        baseRender(rendererMap[pageName], pageName, req, res);
    };
} else {
    const devServerSetup = require('D:/svn/carrier/deploy/branches/dev/webpack-vue-mutiplepage-ssr/build/setup-dev-server');
    const appEntry = require('D:/svn/carrier/deploy/branches/dev/webpack-vue-mutiplepage-ssr/build/multipageWebpackConfig');
    let promiseMap = {};
    for (let pageName in appEntry) {
        let entry = appEntry[pageName];
        let tplPath = router[pageName].template || templatePath;
        promiseMap[pageName] = devServerSetup(server, tplPath, pageName, entry.clientConfig, entry.serverConfig, (pageName, bundle, options) => {
            rendererMap[pageName] = createRenderer(bundle, options);     //刷新renderer
        });
    }
    render = (pageName, req, res) => {
        promiseMap[pageName].then(() => baseRender(rendererMap[pageName], pageName, req, res));     //需要等待文件初始化
    };
}
 
for (let pageName in router) {
    let pageConfig = router[pageName];
    server.get(pageConfig.url, ((pageName) => {
        return (req, res) => {
            render(pageName, req, res);
        }
    })(pageName));
}

const port = 3000;
server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});