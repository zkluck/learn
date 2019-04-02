/**
 * 用于打包服务器直出部分的逻辑
 */
import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {              //模拟拉取接口获取数据
            var data = {
                msg: 'page1 data'
            };
            context.state = data;        //生成到tpl.html中作为浏览器端全局变量
            const { app } = createApp(data);
            resolve(app);
        }, 100);
    })
}