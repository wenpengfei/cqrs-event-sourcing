const EventEmitter = require('events')
const { WorkQueue } = require('rabbitmq-broker')

class CommandBus extends EventEmitter {

    publish(queueName, message) {
        if (this._workerQueue) {
            if (!queueName) {
                throw 'queueName is mandatory'
            }
            return this._workerQueue.send(queueName, JSON.stringify(message))
        }
        throw 'connection is mandatory'
    }

    async startListening(queueName, onMessage) {
        if (this._workerQueue) {
            if (!queueName) {
                throw 'queueName is mandatory'
            }
            return this._workerQueue.receive(queueName, onMessage)
        }
        throw 'connection is mandatory'
    }

    async connect() {
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

module.exports = CommandBus