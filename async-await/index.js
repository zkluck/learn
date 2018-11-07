// async function timeout(){
//     return 'hello world';
// }

// console.log(timeout())
// console.log(2)

function s(num){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(2 * num);
        },2000)
    })
}

s(2)