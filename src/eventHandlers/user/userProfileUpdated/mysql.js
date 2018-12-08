const { EventExecutor  } = require('cqrs-lite')
const events = require('../../../infrastructure/events')
const debug = require('debug')('eventHandles:user:userProfileUpdated:elasticSearch')
const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl:'amqp://localhost',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.userProfileUpdated, function (event, message) {
        debug(event)
    })
})
