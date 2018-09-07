var curry = function(fn){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){
        var newArgs = args.concat(Array.prototype.slice.call(arguments));
        return fn.apply(this,newArgs);
    }
}

function add(a, b){
    return a + b;
}

// var addCurry = curry(add, 1, 2);
// addCurry();

var addCurry = curry(add, 1);
console.log(addCurry(2))