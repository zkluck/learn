var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
var arr1 = [1,2,3];
var arr2 =  [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}];

var arr3 = {a:1,b:2,c:3};

var arr4 = [{old: 1}];

var arr5 = '1'

//var new_arr = JSON.parse(JSON.stringify(arr));

//浅拷贝
var shallowCopy = function(obj){
    if(typeof obj !== 'object') return;
    var newObj = obj instanceof Array? []:{};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

var ar = shallowCopy(arr);

ar[3][0] = 'old3';

// console.log(ar, arr)


//深拷贝
var deepCopy = function(obj) {
    //console.log(typeof obj)
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(typeof obj[key], obj[key])
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
            // console.log(newObj[key])
        }
    }
    //console.log(newObj)
    return newObj;
}

var ar2 = deepCopy(arr4);

// ar2[3][0] = 'old3';

// console.log(ar2, arr)
