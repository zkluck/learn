function Public() {
    this.handlers = {};
}

Public.prototype = {
    on: function(eventType, handler) {
        var self = this;
        if (!(eventType in self.handlers)) {
            self.handlers[eventType] = []
        }
        self.handlers[eventType].push(handler);
        return this;
    },
    emit: function(eventType) {
        var self = this;
        var handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < self.handlers[eventType].length; i++) {
            self.handlers[eventType][i].apply(self, handlerArgs);
        }
        return self;
    },
    off: function(eventType, handler){
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--){
                if (currentEvent[i] === handler){
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
}

var publisher = new Public();

function a(data){
    console.log(data);
}

publisher.on('a', a)
publisher.emit('a', '我是第1次调用的参数');
publisher.off('a', a);
publisher.emit('a', '我是第2次调用的参数');