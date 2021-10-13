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

function observe(data) {
    if(typeof data !== 'object') return
    new Objserver(data)
}

class Objserver {
    constructor(value) {
        this.value = value

        // console.log(this.value)
        this.walk()
    }
    walk() {
        Object.keys(this.value).forEach((key)=>{
            return defineReactive(this.value, key)
        })
    }
}

function defineReactive(data, key, value = data[key]) {
    // console.log(key + ":" + data[key])
    observe(value)
    Object.defineProperty(data, key, {
      get() {
        console.log('get:' + value)
        return value
      },
      set(newValue) {
        if (newValue === value) return
        value = newValue
        console.log('set:' + value)
      }
    })
}

const obj = {
    a: 1,
    b: {
      c: 2
    }
  }
  
observe(obj)

obj.b.c = 3