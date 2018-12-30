import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import deleteProductAttribute from '../../domain/entities/productAttribute/deleteProductAttribute'

const debug = require('debug')('cqrs:commandHandlers:productAttribute:deleteProductAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.deleteProductAttribute, function (command, message) {
        return deleteProductAttribute(command.payload)
    })
})
