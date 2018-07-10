const CommandBus = require('../infrastructure/commandBus')
const EventBus = require('../infrastructure/eventBus')

const commandBus = new CommandBus()
const eventBus = new EventBus()

commandBus.connect()
eventBus.connect()

commandBus.on('connected', () => {
    console.log('commandBus connected')
    commandBus.startListening('sbQueue', async (message) => {
        await eventBus.connect()
        eventBus.publish({
            exchangeName: 'xxxxxxxxxxxx',
            routeKey: 'sbbbbbbbbbbb',
            message: { sb: '你是sb' }
        })
        commandBus.ack(message)
    })
})







