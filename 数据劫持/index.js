// const obj = {}

// let val = 1;

// Object.defineProperty(obj, 'a', {
//     get() {
//         console.log('get property a')
//         return val
//     },
//     set(newVal) {
//         if(val === newVal) return;
//         console.log(`set property a -> ${newVal}`)
//         val = newVal
//     }
// })



// let obj = {}
// function defineReactive(data, key, value = data[key]) {
//     Object.defineProperty(data, key, {
//       get: function reactiveGetter() {
//         console.log(value)
//         return value
//       },
//       set: function reactiveSetter(newValue) {
//         if (newValue === value) return
//         value = newValue
//         console.log(value)
//       }
//     })
//   }
  
// defineReactive(obj, 'a', 1)

// class Objserver {
//     constructor(value) {
//         this.value = value
//         this.walk()
//     }
//     walk() {
//         Object.keys(this.value).forEach((key)=>{
//             return defineReactive(this.value, key)
//         })
//     }
// }
  
// const obj = { a:1, b:2}
// new Objserver(obj)

// function observe(data) {
//     if(typeof data !== 'object') return
//     new Objserver(data)
// }

// class Objserver {
//     constructor(value) {
//         this.value = value

//         // console.log(this.value)
//         this.walk()
//     }
//     walk() {
//         Object.keys(this.value).forEach((key)=>{
//             return defineReactive(this.value, key)
//         })
//     }
// }

// function defineReactive(data, key, value = data[key]) {
//     // console.log(key + ":" + data[key])
//     observe(value)
//     Object.defineProperty(data, key, {
//       get() {
//         console.log('get:' + value)
//         return value
//       },
//       set(newValue) {
//         if (newValue === value) return
//         value = newValue
//         console.log('set:' + value)
//       }
//     })
// }

// const obj = {
//     a: 1,
//     b: {
//       c: 2
//     }
//   }
  
// observe(obj)

// obj.b.c = 3


function defineReactive(obj, key, val) {
  let Dep;

  Object.defineProperty(obj, key, {
    get: ()=>{
      console.log('get')
      // 被读取了，将这个依赖收集起来
      Dep.depend(); // 本次新增
      return val
    },
    set: newVal => {
      if(val === newVal) return;
      val = newVal;
      // 被改变了，通知依赖去更新
      Dep.notify(); // 本次新增
      console.log('set')
    }
  })
}

// let data = {
//   text: 'hello world',
// };

// defineReactive(data, 'text', data.text);

class Observer {
  constructor() {
      // 响应式绑定数据通过方法
    observe(this.data);
  }
}

export function observe (data) {
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
     // 将data中我们定义的每个属性进行响应式绑定
     defineReactive(obj, keys[i]);
  }
}

class Watcher {
  addDep() {
      // 我这个Watcher要被塞到Dep里去了~~
  }
  update() {
      // Dep通知我更新呢~~
  }
}