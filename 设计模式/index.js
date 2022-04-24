// 抽象工厂模式

class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS() {
        throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
    }
    // 提供硬件的接口
    createHardWare() {
        throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
    }
}

// 具体工厂继承自抽象工厂
class FakeStarFacotry extends MobilePhoneFactory{
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}

// 定义操作系统这类产品的抽象产品类
class OS {
    controHadrWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

class AndroidOS extends OS {
    controHadrWare() {
        console.log('我会用安卓的方式去操作硬件');
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件');
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}

const myPhone = new FakeStarFacotry();
const myOS = myPhone.createOS();
const myHardWare = myPhone.createHardWare();

myOS.controHadrWare();
myHardWare.operateByOrder();


// 单例模式

// 静态方法版
class Storage {
    static getInstance() {
        if(!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }
    getItem (key){
        return localStorage.getItem(key);
    }
    setItem (key, value){
        return localStorage.setItem(key, value);
    }
}


// 闭包版
function StorageBase(){}
StorageBase.prototype.getItem = function(key){
    return localStorage.getItem(key);
}

StorageBase.prototype.setItem = function(key, value){
    return localStorage.setItem(key, value);
}

const Storage = (function(){
    let instance = null;
    return function(){
        if(!instance) {
            instance = new StorageBase();
        }
        return instance;
    }
})()

// Modal弹框

const Modal =(function(){
    let modal = null;
    if(!modal) {
        modla = document.createElement('div');
        modal.innerHTML = '我是一个全局唯一的Modal';
        modal.id = 'modal';
        modal.style.display = 'none';
        document.body.appendChild(modal);
    }
})()

document.getElementById('btn').onclick = function(){
    const modal = new Modal()
    modal.style.display = 'block'
}