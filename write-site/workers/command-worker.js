(async () => {
    const { WorkQueue } = require('rabbitmq-processer')
    const userHandler = require('../commandHandlers/user')
    const EventBus = require('../infrastructure/eventBus')
    
    const workQueue = new WorkQueue({ queueName: 'commands' })
    await workQueue.connect()

    const eventBus = new EventBus()
    await eventBus.init()

    workQueue.receive(message => {
        const command = JSON.parse(message.content.toString())
        const { name, payload } = command
        if (userHandler[name]) {
            const event = userHandler[name](payload)
            eventBus.handle(event)
            workQueue.ack(message)
        }
    })
})()