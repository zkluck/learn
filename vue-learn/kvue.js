function defineReactive(obj, key, val) {
    //  递归

    observe(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log('get '+ key);
            return val
        },
        set(newVal) {
            if(newVal !== val) {
                console.log('set '+ key + ':' + newVal);
                observe(newVal)
                val = newVal
            }
        }
    })
}

function observe(obj) {
    if( typeof obj !== 'object' || obj == null) {
        return
    }

    // Observer
}

function set(obj, key, val) {
    defineReactive(obj, key, val)
}

// 创建KVue构造函数

class KVue {
    constructor(options) {
        // 保存选项

        // 响应式处理
    }
}

//  根据对线的类型决定如何做响应化
class Observer {
    constructor(vaule) {
        this.value = vaule

        // if(typeof)
    }
}