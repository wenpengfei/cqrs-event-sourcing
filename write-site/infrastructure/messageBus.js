const EventEmitter = require('events')
const { PubSubQueue, WorkQueue } = require('rabbitmq-processer')

class MessageBus extends EventEmitter {

    publish(options) {
        const { message, queueName, exchangeName, routeKey } = options
        if (this._pubSubQueue) {
            if (!exchangeName) {
                throw 'exchangeName is mandatory'
            }
            if (!routeKey) {
                throw 'exchangeName is mandatory'
            }
            return this._pubSubQueue.publish(exchangeName, routeKey, JSON.stringify(message))
        }
        if (this._workerQueue) {
            if (!queueName) {
                throw 'queueName is mandatory'
            }
            return this._workerQueue.send(queueName, JSON.stringify(message))
        }
        throw 'connection is mandatory'
    }

    async startListening(options, onMessage) {
        const { queueName, exchangeName, routeKey } = options
        if (this._pubSubQueue) {
            if (!exchangeName) {
                throw 'exchangeName is mandatory'
            }
            if (!routeKey) {
                throw 'exchangeName is mandatory'
            }
            this._pubSubQueue.subscribe(exchangeName, routeKey, onMessage)
        }
        if (this._workerQueue) {
            if (!queueName) {
                throw 'queueName is mandatory'
            }
            this._workerQueue.receive(queueName, onMessage)
        }
        throw 'connection is mandatory'
    }

    
    async connectPubSubQueue() {
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

    async connectWorkerQueue() {
        const workQueue = new WorkQueue()
        try {
            this.emit('connecting')
            await workQueue.connect()
            this._workerQueue = workQueue
            this.emit('connected')
        } catch (error) {
            this.emit('error')
        }
    }

    ack(message) {
        this._workerQueue.ack(message)
    }
}

module.exports = MessageBus
