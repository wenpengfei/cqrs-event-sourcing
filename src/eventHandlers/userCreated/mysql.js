const { EventBus } = require('cqrs-lite')
const events = require('../../infrastructure/events')
const { User } = require('../../persistents/mysql/adapter/makeMysqlClient')

const eventBus = new EventBus()
eventBus.connect('amqp://localhost')

eventBus.on('connected', () => {
    eventBus.startListening({
        exchangeName: events.userCreated,
        routeKey: events.userCreated
    }, async (message) => {
        const event = JSON.parse(message.content.toString())
        const { userId, userName, password } = event.payload
        const { version } = event
        User.create({ userId, userName, password, version })
    })
})
