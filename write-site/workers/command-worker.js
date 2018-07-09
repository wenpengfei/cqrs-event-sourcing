// this worker can distributed
(async () => {
    const { WorkQueue } = require('rabbitmq-processer')
    const userHandler = require('../commandHandlers/user')
    const EventBus = require('../infrastructure/eventBus')
    
    const workQueue = new WorkQueue()
    await workQueue.connect()

    const eventBus = new EventBus()
    await eventBus.init()

    workQueue.receive('commands', message => {
        const command = JSON.parse(message.content.toString())
        console.log(command)
        const { name, payload } = command
        if (userHandler[name]) {
            const event = userHandler[name](payload)
            eventBus.handle(event)
            workQueue.ack(message)
        }
    })
})()