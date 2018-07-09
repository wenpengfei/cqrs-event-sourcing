const { WorkQueue } = require('rabbitmq-processer')

class CommandBus {

    async init() {
        const workQueue = new WorkQueue({ queueName: 'commands' })
        await workQueue.connect()
        this._workQueue = workQueue
    }

    handle(command) {
        if (this._workQueue) {
            this._workQueue.send(JSON.stringify(command))
        } else {
            throw 'mq connect error'
        }
    }
}

module.exports = CommandBus