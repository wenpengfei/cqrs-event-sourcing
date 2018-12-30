import commands from '../../infrastructure/commands'
import updateProductSku from '../../domain/entities/productSku/updateProductSku'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productSku:updateProductSku')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateProductSku, function (command, message) {
        return updateProductSku(command.payload)
    })
})
