const { PubSubQueue } = require('rabbitmq-processer')

class EventBus {

    async init() {
        const pubSubQueue = new PubSubQueue()
        await pubSubQueue.connect()
        this._pubSubQueue = pubSubQueue
    }

    handle(event) {
        if (this._pubSubQueue) {
            this._pubSubQueue.publish('domain.events', `domain.events`, JSON.stringify(event))
        } else {
            throw 'mq connect error'
        }
    }
}

module.exports = EventBus
