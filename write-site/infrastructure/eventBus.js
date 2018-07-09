const { PubSubQueue } = require('rabbitmq-processer')

class EventBus {

    async init() {
        const pubSubQueue = new PubSubQueue({ exchangeName: 'events' })
        await pubSubQueue.connect()
        this._pubSubQueue = pubSubQueue
    }

    handle(event) {
        if (this._pubSubQueue) {
            console.log('eventBus', event)
            this._pubSubQueue.publish(JSON.stringify(event))
        } else {
            throw 'mq connect error'
        }
    }
}

module.exports = EventBus
