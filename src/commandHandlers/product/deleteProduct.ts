import commands from '../../infrastructure/commands'
import deleteProduct from '../../domain/entities/product/deleteProduct'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:product:deleteProduct')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.deleteProduct, function (command, message) {
        return deleteProduct(command.payload)
    })
})
