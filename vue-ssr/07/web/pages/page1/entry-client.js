/**
 * 用于打包客户端部分的js逻辑
 */
import { createApp } from './app'

const { app } = createApp(__INITIAL_STATE__) 

app.$mount('#app')