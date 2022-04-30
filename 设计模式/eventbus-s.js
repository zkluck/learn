class EventBus {
    constructor() {
        this.eventObject = {}
        this.callbackId = 0;
    }

    publish(eventName, ...args) {
        const callbackObject = this.eventObject[eventName];
        if (!callbackObject) return console.log('no event named ' + eventName);

        for (let id in callbackObject) {
            // console.log(id)
            callbackObject[id](...args)
        }
    }

    subscribe(eventName, cb) {
        if (!this.eventObject[eventName]) {
            this.eventObject[eventName] = []
        }

        const id = this.callbackId++;

        this.eventObject[eventName][id] = cb;

        // this.eventObject[eventName].push(cb)

        const unSubscribe = () => {
            delete this.eventObject[eventName][id]

            if (Object.keys(this.eventObject[eventName]).length === 0) {
                delete this.eventObject[eventName]
            }
        }

        return {
            unSubscribe
        }
    }

    // 清除事件
    clear(eventName) {
        // 未提供事件名称，默认清除所有事件
        if (!eventName) {
            this.eventObject = {};
            return;
        }

        // 清除指定事件
        delete this.eventObject[eventName];
    }

}

const eventBus = new EventBus()

// 订阅事件eventX
eventBus.subscribe("eventX", (obj, num) => {
    console.log("模块A", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
    console.log("模块B", obj, num);
});
const subscriberC = eventBus.subscribe("eventX", (obj, num) => {
    console.log("模块C", obj, num);
});

// 发布事件eventX
eventBus.publish("eventX", {
    msg: "EventX published!"
}, 1);

subscriberC.unSubscribe();

// 再次发布事件eventX，模块C不会再收到消息了
eventBus.publish("eventX", {
    msg: "EventX published again!"
}, 2);