import commands from '../../infrastructure/commands'
import updateProduct from '../../domain/entities/product/updateProduct'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:product:updateProduct')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateProduct, function (command, message) {
        return updateProduct(command.payload)
    })
})
