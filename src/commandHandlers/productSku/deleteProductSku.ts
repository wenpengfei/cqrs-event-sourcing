import commands from '../../infrastructure/commands'
import deleteProductSku from '../../domain/entities/productSku/deleteProductSku'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productSku:deleteProductSku')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.deleteProductSku, function (command, message) {
        return deleteProductSku(command.payload)
    })
})
