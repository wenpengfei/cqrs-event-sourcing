import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import createProductAttribute from '../../domain/entities/productAttribute/createProductAttribute'

const debug = require('debug')('cqrs:commandHandlers:productAttribute:createProductAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createProductAttribute, function (command, message) {
        return createProductAttribute(command.payload)
    })
})
