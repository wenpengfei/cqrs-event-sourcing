const EventBus = require('../../infrastructure/eventBus')
const events = require('../../infrastructure/events')

const eventBus = new EventBus()
eventBus.connect()

eventBus.on('connected', () => {
    eventBus.startListening({
        exchangeName: events.userCreated,
        routeKey: events.userCreated
    }, async (message) => {
        console.log('mysql receive:', message.content.toString())
    })
})
