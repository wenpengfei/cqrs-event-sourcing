import commands from '../../infrastructure/commands'
import createProductSku from '../../domain/entities/productSku/createProductSku'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productSku:createProductSku')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createProductSku, function (command, message) {
        return createProductSku(command.payload)
    })
})
