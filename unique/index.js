var array = [1, 1, 'a', 'a', '1', '1'];
var array2 = [1, 2, 1, 2, 'a', 'A', 'a'];
var array3 = [1, 'b', 1, 'a', 2, 'A', 2, 2];
var array4 = [{value: 1}, {value: '2'}];

//双层循环
function unique(array) {
    var res = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < res.length; j++) {
            if (array[i] === res[j]) {
                break;
            }
        }
        if (j === res.length) {
            res.push(array[i]);
        }
    }
    return res;
}

//indexOf
function unique1(array) {
    var res = [];
    for (var i = 0; i < array.length; i++) {
        var current = array[i];
        // 如果要检索的字符串值没有出现，则该方法返回 -1
        if (res.indexOf(current) === -1) {
            res.push(current);
        }
    }
    return res;
}

//排序后去重
function unique2(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

function unique3(array, isSorted) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value);
            }
            seen = value;
        } else if (res.indexOf(value) === -1) {
            res.push(value);
        }
    }
    return res;
}

function unique4(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value, i, array) : value;
        if(isSorted){
            if(!i || seen !== computed){
                res.push(computed)
            }
            seen = computed;
        }else if(iteratee){
            if(seen.indexOf(computed) === -1){
                seen.push(computed);
                res.push(computed);
            }
        }else if(res.indexOf(computed) === -1){
            res.push(computed);
        }
    }
    return res;
}

/*console.log(unique4(array3, false, function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
}));
*/

//ES5
function unique5(array){
    return array.concat().sort().filter(function(item, index, array){
        return item !== array[index -1]
    })
}

function unique6(array){
    return array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
}

//Object
function unique7(array){
    var obj = {};
    return array.filter(function(item, index, array){
       return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : obj[typeof item + JSON.stringify(item)] = true;
    })
}

// ES6
function unique8(array){
    return Array.from(new Set(array));
}

function unique9(array){
    const seen = new Map();
    return array.filter((a) => !seen.has(a) && seen.set(a, 1));
}

console.log(unique9(array))