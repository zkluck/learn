
const Dep = {
    target: null
}

function reactive(obj, key, val) {
    const deps = []

    Object.defineProperty(obj, key, {
        get() {
            console.log(`我的${key}属性被读取了！`)
            if (Dep.target && deps.indexOf(Dep.target) === -1) { 
                deps.push(Dep.target) 
            } 
            return val
        },
        set(newVal) {
            console.log(`我的${key}属性被修改了！`)
            val = newVal;
            deps.forEach((dep) => { 
                dep() 
            })
        }
    })
}

function observable(obj) {
    const keys = Object.keys(obj)
    keys.forEach((key)=>{reactive(obj, key, obj[key])})
    return obj
}

function computed(val) {
    console.log(`我的类型是:${val}`);
}

function watcher(obj, key, cb) {

    const onDepUpdated = ()=> {
        const val = cb()
        computed(val)
    }

    Object.defineProperty(obj, key, {
        get() {
            Dep.target = onDepUpdated 

            const val = cb()
            Dep.target = null 
            return val;
        },
        set() {
            console.error('计算属性无法被赋值！')
        }
    })
}

const hero = observable({
    hp: 1000,
    ad: 100
})

watcher(hero, 'type', ()=>{
    return hero.hp <= 1000 ? '后排' : '坦克'
})

console.log(`英雄初始类型：${hero.type}`)

hero.hp = 4000
