(function() {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    var _ = function(obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    }

    var ArrayProto = Array.prototype;
    var push = ArrayProto.push;


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



var res = _.chain(2).log().log().log().value();

console.log(res)

// _('2,2').log();
// console.log(_.log(1));