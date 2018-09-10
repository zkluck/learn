Function.prototype.call2 = function(context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        //args.push(arguments[i]);
        //console.log(args + '~~~~~~~~~~');
        args.push('arguments[' + i + ']');
        //console.log(args)
    }
    //console.log(args);
    //context.fn(args)
    var result = eval('context.fn(' + args + ')');
    //context.fn();
    delete context.fn;
    return result;
}

var foo = {
    value: 2
}

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

//bar.call2(foo, 'kk', 22);

/*var value = 1;

function bar(){
    console.log(this.value);
}*/

/*var obj = {
    value: 1
}

function bar(name, age){
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call2(obj, 'kk', 22));*/

//ES6
Function.prototype.call3 = function(context) {
    var context = context || window;
    context.fn = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var result = context.fn(...args);
    delete context.fn;
    return result;
}



//错误
Function.prototype.call3 = function(context) {
    context.__fn = this || window;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    var result = context.__fn(args.join(','));
    delete context.__fn;
    return result;
}

bar.call2(foo, 'kk', 22);




