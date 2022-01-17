// 浅拷贝

let obj = {
    // name: 'zk',
    arr: [1],
    // foo: function() {
    //   console.log(1)
    // }
}

let obj5 = JSON.parse(JSON.stringify(obj))

obj.arr[0] = 0;

console.log(obj)
console.log(obj5)

let obj2 = shallowCopy(obj);

// 浅拷贝
function shallowCopy(source){
    var target = {};
    for(var i in source) {
        if(source.hasOwnProperty(i)) {
            target[i] = source[i]
        }
    }
    return target;
}

// 浅拷贝
let ob4 = Object.assign({}, obj)




let obj3 = deepCopy(obj)

obj.arr[0] = 0;

// 深拷贝
function deepCopy(obj){
    if (obj === null) return obj; 
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;

    // var cloneObj = obj instanceof Array? []:{};
    var cloneObj = new obj.constructor();
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            cloneObj[key] = deepCopy(obj[key])
        }
    }
    return cloneObj;
}

