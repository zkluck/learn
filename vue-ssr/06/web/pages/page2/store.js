// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const fetchBar = function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('返回 ajax 数据');
      }, 1000);
    });
  };

export function createStore () {
    return new Vuex.Store({
        //state就是数据
        state: {
            msg: 'default'
        },
        //通过事件触发action的函数，而不是直接调用
        actions: {
            setData ({ commit }) {
                return fetchBar().then((data) => {
                    commit('setMsg', data);
                })
            },
        },
        //mutations做所有数据的修改
        mutations: {
            'setMsg' (state, msg) {
                state.msg = msg;
            }
        }
    })
}