import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import updateProductAttribute from '../../domain/entities/productAttribute/updateProductAttribute'

const debug = require('debug')('cqrs:commandHandlers:productAttribute:updateProductAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateProductAttribute, function (command, message) {
        return updateProductAttribute(command.payload)
    })
})
