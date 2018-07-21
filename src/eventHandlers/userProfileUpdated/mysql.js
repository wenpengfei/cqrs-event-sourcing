const { EventBus } = require('cqrs-lite')
const events = require('../../infrastructure/events')
const { User } = require('../../persistents/mysql/adapter/makeMysqlClient')

const eventBus = new EventBus()
eventBus.connect('amqp://localhost')

eventBus.on('connected', () => {
    eventBus.startListening({
        exchangeName: events.userProfileUpdated,
        routeKey: events.userProfileUpdated
    }, async (message) => {
        const event = JSON.parse(message.content.toString())
        console.log(event)
        const { userId, userName } = event.payload
        const { version } = event
        User.update(
            { userName, version },
            { where: { userId } }
        )
    })
})
