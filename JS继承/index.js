function Parent(name){
    this.name = name; // 实例基本属性（该属性，强调私有，不共享）
    this.arr = [1]; // （该属性，强调私有）
}
Parent.prototype.say = function(){ // 将需要复用，共享的方法定于在父类的原型上
    console.log('hello')
}
function Child(name,like) {
    Parent.call(this,name,like) // 核心
    this.like = like;
}

//核心 通过创建中间对象，子类原型和父类原型，就会隔离开。不是同一个，有效避免了优化方式1的缺点
Child.prototype = Object.create(Parent.prototype)

// Object.create 简单实现
// function F() {}
// F.prototype = Parent.prototype
// Child.prototype = new F()

Child.prototype.constructor = Child // 修正constructor指向

let boy1 = new Child('小红','apple');
let p1 = new Parent('小爸爸')

console.log(boy1.constructor); // Child
console.log(p1.constructor); // Parent