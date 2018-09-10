/*function Otaku(name, age){
    this.name = name;
    this.age = age;
    this.habit = 'game';
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('aaa');
console.log(person.__proto__ === Otaku.prototype)*/

/*function Otaku(name, age){
    this.name = name;
    this.age = age;
    this.habit = 'game';
}*/

var Otaku = function (name, age) {
  this.name = name;
  this.age = age;
}

function objectFactory(){
    var obj = new Object();
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return (typeof ret === 'object' || ret !== null) ? ret : obj;
}

Otaku.prototype.strength = 60;
Otaku.prototype.height = '160';

var person = objectFactory(Otaku, 'Kevin', '18')
var newPerson = new Otaku('aaa', 19);

console.log(newPerson)

//console.log(newPerson.height, person.height)