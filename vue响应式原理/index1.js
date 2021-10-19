// 充当依赖管理的角色
class Dep {
    constructor() {
      // 管理依赖的列表
      this.subs = [];
    }
  
    addSub(sub) {
      this.subs.push(sub);
    }
  
    // 依赖收集
    append() {
      this.addSub(Dep.target);
    }
  
    // 派发更新
    notify() {
      this.subs.forEach((fn) => fn());
    }
  }

function defineReactive(target, key, val) {
    const dep = new Dep();

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get() {
        // 依赖收集
        if (Dep.target) {
            dep.append();
        }
        
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;

        // 派发更新
        dep.notify();
      },
    });
  }
  
  const obj = {
    msg: '111',
  };

  defineReactive(obj, 'msg', obj['msg']);

  const fn = () => {
    console.log(`msg ==> ${obj.msg}`);
  };

// 赋值给 Dep.target
Dep.target = fn;
fn();
Dep.target = null;

 obj.msg = '222';
