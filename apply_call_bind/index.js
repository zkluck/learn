function bar(){
    console.log(this)
}

var foo = {
    value : 1
}

Function.prototype.myCall = function (thisArg) {
    thisArg = thisArg || window;
    thisArg.func = this;
    const args = []
    for (let i = 1; i<arguments.length; i++) {
        args.push('arguments['+ i + ']')
    }
    const result = eval('thisArg.func(' + args +')')
    delete thisArg.func;
    return result;
}

// es6
Function.prototype.MyCall = function(context, ...args){
    
    context = Object(context) || window;
    console.log(context)
    args = args?args:[];
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args)
    delete context[key]
    return result
}

bar.MyCall(1)


Function.prototype.MyApply = function(context, args){
    
    context = context || window;
    args = args?args:[];
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args)
    delete context[key]
    return result
}


Function.prototype.MyBind = function(context, ...args) {
    const _self = this;
    const newFn = function(...rest) {
        return _self.call(context, ...args, ...rest)
    }

    if(_self.prototype) {
        newFn.prototype = Object.create(_self.prototype);
    }
    return newFn;
}