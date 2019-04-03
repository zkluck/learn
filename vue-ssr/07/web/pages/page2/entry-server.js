/**
 * 用于打包服务器直出部分的逻辑
 */
import {createApp} from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, store} = createApp();
        // 调用store actions的方法
        store.dispatch('setData').then(() => {
            context.state = store.state;        //生成到tpl.html中作为浏览器端全局变量
            resolve(app);
        }).catch(reject);
      
    })
}