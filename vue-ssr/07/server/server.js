const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const backendRouter = new Router();
const server = new Koa();
const { createBundleRenderer } = require('vue-server-renderer');
const router = require('./router.js');

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);
const createRenderer = (bundle, options) => createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false
}));

let render;
let rendererMap = {};
let g = {};
const templatePath = resolve('../web/tpl.html'); 
let baseRender = (renderer, pageName) => {
    let routeConfig = router[pageName];
    let context = {title: routeConfig.title};           //这个context同时会传递给entry-server，server里边可以注入数据，然后再交给模版

    renderer.renderToString(context, (err, html) => {
        if(err){
            g[pageName] = '服务器内部错误';
        } else {
            g[pageName] = html;
        }
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
        baseRender(rendererMap[pageName], pageName);
    }
    render = (pageName, ctx) => {
        ctx.body = g[pageName];
    };
} else {
    const devServerSetup = require('../build/setup-dev-server');
    const appEntry = require('../build/multipageWebpackConfig');
    let promiseMap = {};
    for (let pageName in appEntry) {
        let entry = appEntry[pageName];
        let tplPath = router[pageName].template || templatePath;
        promiseMap[pageName] = devServerSetup(server, tplPath, pageName, entry.clientConfig, entry.serverConfig, (pageName, bundle, options) => {
            rendererMap[pageName] = createRenderer(bundle, options);     //刷新renderer
        });
        promiseMap[pageName].then(() =>baseRender(rendererMap[pageName], pageName)); 
    }
    
    render = (pageName, ctx) => {
        //promiseMap[pageName].then(() =>baseRender(rendererMap[pageName], pageName, ctx)); //需要等待文件初始化
        ctx.body = g[pageName];
    };
}



for (let pageName in router) {
    let pageConfig = router[pageName];

    backendRouter.get(pageConfig.url, (ctx) => {
        render(pageName, ctx);
    })
}



// for (let pageName in router) {
//     let pageConfig = router[pageName];

//     backendRouter.get(pageConfig.url, ((pageName) => {
//         return (ctx) => {
//             render(pageName, ctx);
//         }
//     })(pageName));
// }

server.use(serve(path.resolve(__dirname, '../')));

server
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

const port = 3000;
server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});