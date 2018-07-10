const EventBus = require('../infrastructure/eventBus')
const eventBus = new EventBus()
eventBus.connect()

eventBus.on('connected', async () => {
    const options = { exchangeName: 'xxxxxxxxxxxx', routeKey: 'sbbbbbbbbbbb' }
    eventBus.startListening(options, message => {
        console.log('mongo-worker', message.content.toString())
    })
})