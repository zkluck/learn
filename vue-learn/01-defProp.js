// 响应式

const orginalProto = Array.prototype
const arrayProto = Object.create(orginalProto);
['push', 'pop', 'shift', 'unshift'].forEach(method=>{
    arrayProto[method] = function() {
        // 原始操作
        orginalProto[method] .apply(this, arguments)
        // 覆盖操作:通知更新
        console.log('数组执行' + method + '操作')
    }
})

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

    if(Array.isArray(obj)) {
        obj.__proto__=arrayProto
        const keys = Object.keys(obj)
        for (let i=0; i<obj.length; i++) {
            observe(obj[i])
        }
    } else {
        Object.keys(obj).forEach(key=>{
            defineReactive(obj, key, obj[key])
        })
    }  
}

function set(obj, key, val) {
    defineReactive(obj, key, val)
}

// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'foooooooooooo'

const obj = { foo: 'foo', bar: 'bar', baz: { a:1 }, arr: [1,2,3,4]}

observe(obj)

// obj.foo
// obj.foo = 'foooooooooooo'
// obj.foo

set(obj, 'dong', 'dong')
obj.dong

obj.baz.a = 11111

obj.arr.push(4)