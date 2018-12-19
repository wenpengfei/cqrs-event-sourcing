const { EventExecutor } = require('cqrs-lite')
const events = require('../../../infrastructure/events')
const debug = require('debug')('cqrs:eventHandles:member:memberCreated:elasticsearch')
const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.memberCreated, function (event, message) {
        debug(event)
    })
})
