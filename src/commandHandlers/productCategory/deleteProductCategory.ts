import commands from '../../infrastructure/commands'
import deleteProductCategory from '../../domain/entities/productCategory/deleteProductCategory'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productCategory:deleteProductCategory')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.deleteProductCategory, function (command, message) {
        return deleteProductCategory(command.payload)
    })
})
