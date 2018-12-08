const { EventExecutor  } = require('cqrs-lite')
const events = require('../../../infrastructure/events')
const debug = require('debug')('eventHandles:user:userCreated:mysql')
const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl:'amqp://localhost',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.userCreated, function (event, message) {
        debug(event)
    })
})
