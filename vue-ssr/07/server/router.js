module.exports = {
    'page1': {
        url: '/page1',                         //访问的url规则，用于express的get
        dir: './web/pages/page1',                   //页面目录，默认有app.js作为入口
        template: './web/pages/page1/tpl.html'      //特殊指定一个html
    },
    'page2': {
        url: '/page2',                 //访问的url规则，用于express的get
        dir: './web/pages/page2',          //页面目录，默认有app.js作为入口
        title: 'Page2'                      //生成html的title
    }
}