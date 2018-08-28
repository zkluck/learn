(function() {
    //建立一个root对象，客户端为`window||self`
    //服务端(node)为`global`
    //web work为`self`
    //node vm为`this`
    //微信小程序为`{}`
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global == global && global ||
        this || {};

    var ArrayProto = Array.prototype;
    var push = ArrayProto.push;

    // 核心函数
    // `_` 其实是一个构造函数
    // 支持无 new 调用的构造函数（思考 jQuery 的无 new 调用）
    // 将传入的参数（实际要操作的数据）赋值给 this._wrapped 属性
    // OOP 调用时，_ 相当于一个构造函数
    // each 等方法都在该构造函数的原型链上
    // _([1, 2, 3]).each(alert)
    // _([1, 2, 3]) 相当于无 new 构造了一个新的对象
    // 调用了该对象的 each 方法，该方法在该对象构造函数的原型链上
    var _ = function(obj) {
        // 以下均针对 OOP 形式的调用
        // 如果是非 OOP 形式的调用，不会进入该函数内部

        // 如果 obj 已经是 `_` 函数的实例，则直接返回 obj
        if (obj instanceof _) return obj;

        // 如果不是 `_` 函数的实例
        // 则调用 new 运算符，返回实例化的对象
        if (!(this instanceof _)) return new _(obj);

        // 将 obj 赋值给 this._wrapped 属性
        this._wrapped = obj;
    };

    // 将上面定义的 `_` 局部变量赋值给全局对象中的 `_` 属性
    // 即客户端中 window._ = _
    // 服务端(node)中 exports._ = _
    // 同时在服务端向后兼容老的 require() API
    // 这样暴露给全局后便可以在全局环境中使用 `_` 变量(方法)
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }


    var optimizeCb = function(func, context, argCount) {
        // 如果没有指定 this 指向，则返回原函数
        if (context === void 0) return func;
        return function() {
            return func.apply(context, arguments);
        };
    }

    // 闭包
    var property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    // Math.pow(2, 53) - 1 是 JavaScript 中能精确表示的最大数字
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    // getLength 函数
    // 该函数传入一个参数，返回参数的 length 属性值
    // 用来获取 array 以及 arrayLike 元素的 length 属性值
    var getLength = property('length');

    // 判断是否是 ArrayLike Object
    // 类数组，即拥有 length 属性并且 length 属性值为 Number 类型的元素
    // 包括数组、arguments、HTML Collection 以及 NodeList 等等
    // 包括类似 {length: 10} 这样的对象
    // 包括字符串、函数等
    var isArrayLike = function(collection) {
        // 返回参数 collection 的 length 属性值
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // 传入一个对象
    // 遍历该对象的键值对（包括 own properties 以及 原型链上的）
    // 如果某个 value 的类型是方法（function），则将该 key 存入数组
    // 将该数组排序后返回
    _.functions = _.methods = function(obj) {
        // 返回的数组
        var names = [];

        // if IE < 9
        // 且对象重写了 `nonEnumerableProps` 数组中的某些方法
        // 那么这些方法名是不会被返回的
        // 可见放弃了 IE < 9 可能对 `toString` 等方法的重写支持
        for (var key in obj) {
            // 如果某个 key 对应的 value 值类型是函数
            // 则将这个 key 值存入数组
            if (_.isFunction(obj[key])) names.push(key);
        }

        // 返回排序后的数组
        return names.sort();
    };

    // 与 ES5 中 Array.prototype.forEach 使用方法类似
    // 遍历数组或者对象的每个元素
    // 第一个参数为数组（包括类数组）或者对象
    // 第二个参数为迭代方法，对数组或者对象每个元素都执行该方法
    // 该方法又能传入三个参数，分别为 (item, index, array)（(value, key, obj) for object）
    // 与 ES5 中 Array.prototype.forEach 方法传参格式一致
    // 第三个参数（可省略）确定第二个参数 iteratee 函数中的（可能有的）this 指向
    // 即 iteratee 中出现的（如果有）所有 this 都指向 context
    // notice: 不要传入一个带有 key 类型为 number 的对象！
    // notice: _.each 方法不能用 return 跳出循环（同样，Array.prototype.forEach 也不行）
    _.each = _.forEach = function(obj, iteratee, context) {
        // 根据 context 确定不同的迭代函数
        iteratee = optimizeCb(iteratee, context);

        var i, length;

        // 如果是类数组
        // 默认不会传入类似 {length: 10} 这样的数据
        if (isArrayLike(obj)) {
            // 遍历
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else { // 如果 obj 是对象
            // 获取对象的所有 key 值
            var keys = _.keys(obj);

            // 如果是对象，则遍历处理 values 值
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj); // (value, key, obj)
            }
        }

        // 返回 obj 参数
        // 供链式调用（Returns the list for chaining）
        // 应该仅 OOP 调用有效
        return obj;
    };

    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }

    _.re = function(string) {
        return string + 1;
    }

    // 可向 underscore 函数库扩展自己的方法
    // obj 参数必须是一个对象（JavaScript 中一切皆对象）
    // 且自己的方法定义在 obj 的属性上
    // 如 obj.myFunc = function() {...}
    // 形如 {myFunc: function(){}}
    // 之后便可使用如下: _.myFunc(..) 或者 OOP _(..).myFunc(..)
    _.mixin = function(obj) {
        // 遍历 obj 的 key，将方法挂载到 Underscore 上
        // 其实是将方法浅拷贝到 _.prototype 上
        _.each(_.functions(obj), function(name) {
            // 直接把方法挂载到 _[name] 上
            // 调用类似 _.myFunc([1, 2, 3], ..)
            var func = _[name] = obj[name];

            // 浅拷贝
            // 将 name 方法挂载到 _ 对象的原型链上，使之能 OOP 调用
            _.prototype[name] = function() {
                // 第一个参数
                var args = [this._wrapped];

                // arguments 为 name 方法需要的其他参数
                push.apply(args, arguments);
                // 执行 func 方法
                // 支持链式操作
                return result(this, func.apply(_, args));
            };
        });
    };

    // 将前面定义的 underscore 方法添加给包装过的对象
    // 即添加到 _.prototype 中
    // 使 underscore 支持面向对象形式的调用
    _.mixin(_);

})()

//console.log(_.re(1))
console.log(_(3).re())