//import * as test from './test'
import test, {bar, zcar} from './test'

console.log(test);
console.log('bar:', bar);
console.log('zcar:', zcar);

const app = document.querySelector('#root')
app.innerHTML = '啊，全部被清空啦，准备工作终于做完了，可以开始学习ES6啦'