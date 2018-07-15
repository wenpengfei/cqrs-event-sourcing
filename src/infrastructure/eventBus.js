const EventEmitter = require('events')
const { PubSubQueue } = require('rabbitmq-broker')

class EventBus extends EventEmitter {

    async publish(options) {
        const { message, exchangeName, routeKey } = options
        if (this._pubSubQueue) {
            if (!exchangeName) {
                throw 'exchangeName is mandatory'
            }
            if (!routeKey) {
                throw 'routeKey is mandatory'
            }
            return this._pubSubQueue.publish(exchangeName, routeKey, JSON.stringify(message))
        }
        throw 'connection is mandatory'
    }

    async startListening(options, onMessage) {
        const { exchangeName, routeKey } = options
        if (this._pubSubQueue) {
            if (!exchangeName) {
                throw 'exchangeName is mandatory'
            }
            if (!routeKey) {
                throw 'exchangeName is mandatory'
            }
            return this._pubSubQueue.subscribe(exchangeName, routeKey, onMessage)
        }
        throw 'eventBus connection is mandatory'
    }

    
    async connect() {
        const pubSubQueue = new PubSubQueue()
        try {
            this.emit('connecting')
            await pubSubQueue.connect()
            this._pubSubQueue = pubSubQueue
            this.emit('connected')
        } catch (error) {
            this.emit('error')
        }
    }

}

module.exports = EventBus