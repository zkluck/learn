(function() {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    var _ = function(obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var push = ArrayProto.push,
        hasOwnProperty = ObjProto.hasOwnProperty; //判断一个属性是否来自对象本身

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys;


    if (typeof exports != 'undefined' && !exports.nodeType) {
        //新版本
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.VERSION = '0.1';


    //console.log(_.hasOwnProperty('log')) //判断一个属性是否来自对象本身
    //console.log('log' in _)  //用来判断一个属性是否存在于这个对象中
    //console.log( !_.hasOwnProperty('log') && ('log' in _))

    //获取_对象上的方法
    _.functions = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    }

    //判断function类型
    _.isFunction = function(obj) {
        return typeof obj == 'function' || false;
    }

    //数组length最大值
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    //判断类数组
    var isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    var chainResult = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };

    var cb = function(value, context, argCount) {
        if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        return _.property(value);
    };

    var optimizeCb = function(func, context) {
        // 如果没有传入 context，就返回 func 函数
        if (context === void 0) return func;
        return function() {
            return func.apply(context, arguments);
        };
    };

    var createAssigner = function(keysFunc, undefinedOnly) {
        // 返回函数
        // 经典闭包（undefinedOnly 参数在返回的函数中被引用）
        // 返回的函数参数个数 >= 1
        // 将第二个开始的对象参数的键值对 "继承" 给第一个参数
        return function(obj) {
            var length = arguments.length;
            // 只传入了一个参数（或者 0 个？）
            // 或者传入的第一个参数是 null
            if (length < 2 || obj == null) return obj;

            // 枚举第一个参数除外的对象参数
            // 即 arguments[1], arguments[2] ...
            for (var index = 1; index < length; index++) {
                // source 即为对象参数
                var source = arguments[index],
                    // 提取对象参数的 keys 值
                    // keysFunc 参数表示 _.keys
                    // 或者 _.allKeys
                    keys = keysFunc(source),
                    l = keys.length;

                // 遍历该对象的键值对
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    // _.extend 和 _.extendOwn 方法
                    // 没有传入 undefinedOnly 参数，即 !undefinedOnly 为 true
                    // 即肯定会执行 obj[key] = source[key]
                    // 后面对象的键值对直接覆盖 obj
                    // ==========================================
                    // _.defaults 方法，undefinedOnly 参数为 true
                    // 即 !undefinedOnly 为 false
                    // 那么当且仅当 obj[key] 为 undefined 时才覆盖
                    // 即如果有相同的 key 值，取最早出现的 value 值
                    // *defaults 中有相同 key 的也是一样取首次出现的
                    if (!undefinedOnly || obj[key] === void 0)
                        obj[key] = source[key];
                }
            }

            // 返回已经继承后面对象参数属性的第一个参数对象
            return obj;
        };
    };

    _.property = function(path) {
        // 如果不是数组
        if (!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function(obj) {
            return deepGet(obj, path);
        };
    };

    var shallowProperty = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    // 根据路径取出深层次的值
    var deepGet = function(obj, path) {
        var length = path.length;
        for (var i = 0; i < length; i++) {
            if (obj == null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };

    // 返回一个对象的 keys 数组
    // 不仅仅是 own enumerable properties
    // 还包括原型链上继承的属性
    _.allKeys = function(obj) {
        // 容错
        // 不是对象，则返回空数组
        if (!_.isObject(obj)) return [];

        var keys = [];
        for (var key in obj) keys.push(key);

        // Ahem, IE < 9.
        // IE < 9 下的 bug，同 _.keys 方法
        // if (hasEnumBug) collectNonEnumProps(obj, keys);

        return keys;
    };

    // 返回一个对象的 keys 组成的数组
    // 仅返回 own enumerable properties 组成的数组
    _.keys = function(obj) {
        // 容错
        // 如果传入的参数不是对象，则返回空数组
        if (!_.isObject(obj)) return [];

        // 如果浏览器支持 ES5 Object.key() 方法
        // 则优先使用该方法
        if (nativeKeys) return nativeKeys(obj);

        var keys = [];

        // own enumerable properties
        for (var key in obj)
            // hasOwnProperty
            if (_.has(obj, key)) keys.push(key);

        // Ahem, IE < 9.
        // IE < 9 下不能用 for in 来枚举某些 key 值
        // 传入 keys 数组为参数
        // 因为 JavaScript 下函数参数按值传递
        // 所以 keys 当做参数传入后会在 `collectNonEnumProps` 方法中改变值
        // if (hasEnumBug) collectNonEnumProps(obj, keys);

        return keys;
    };

    _.identity = function(value) {
        return value;
    };

    _.matcher = function(attrs) {
        attrs = _.extend({}, attrs);

        return function(obj) {

            return _.isMatch(obj, attrs);
        };
    };

    _.isMatch = function(object, attrs) {

        var keys = _.keys(attrs),
            length = keys.length;

        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };

    _.extend = createAssigner(_.allKeys);

    //链式调用
    _.chain = function(obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    }

    //循环
    _.each = function(obj, callback) {
        var length, i = 0;

        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                //call 改变this的指向
                // === flase 终止循环
                if (callback.call(obj[i], obj[i], i) === false) break;
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], obj[i], i) === false) break;
            }
        }
        return obj;
    }

    _.iteratee = builtinIteratee = function(value, context) {
        if (typeof value == 'function') {
            return function(...rest) {
                return value.call(context, ...rest);
            }
        }
        return function(value) {
            return value;
        }
    }

    //判断数组
    _.isArray = nativeIsArray || function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    //判断对象
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    _.has = function(obj, key) {
        // obj 不能为 null 或者 undefined
        return obj != null && hasOwnProperty.call(obj, key);
    };

    _.map = function(obj, iteratee, context) {
        iteratee = cb(iteratee, obj);
        var length = obj.length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            results[index] = iteratee.call(context, obj[index], index, obj);
        }
        return results;
    };

    //测试
    _.log = function(obj) {
        return obj + 1;
    }


    //把_对象上的方法挂载到_原型上
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return chainResult(this, func.apply(_, args));
            };
        });

        return _;
    };

    _.mixin(_);

    _.prototype.value = function() {
        return this._wrapped;
    };

})();


console.log(_.map([{ aa: 11, bb: 22 }], 'bb'));