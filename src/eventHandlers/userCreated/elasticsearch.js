const { EventBus } = require('cqrs-lite')
const events = require('../../infrastructure/events')

const eventBus = new EventBus()
eventBus.connect()

eventBus.on('connected', () => {
    eventBus.startListening({
        exchangeName: events.userCreated,
        routeKey: events.userCreated
    }, async (message) => {
        console.log('elastic receive:', message.content.toString())
    })
})
