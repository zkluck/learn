var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    container.innerHTML = count++;
};

/*function debounce(func, wait) {
    var timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
}*/

function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

/*function debounce(func, wait, immediate){
	var timeout;
	return function(){
		var context = this;
		var args = arguments;

		if (timeout) clearTimeout(timeout);
		if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
	}
}*/

/*function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}*/

container.onmousemove = debounce(getUserAction, 1000, true);
