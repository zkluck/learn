function countUp (n) {
    if(n > 1) {
        countUp(n-1)
    }
    console.log(n)
}

// countUp(2)

function factorial(n){  // 阶乘  n!
    if(n===0) {
        return 1
    }
    return n * factorial(n-1);
}

console.log(factorial(5))