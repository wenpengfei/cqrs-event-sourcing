import commands from '../../infrastructure/commands'
import updateProductCategory from '../../domain/entities/productCategory/updateProductCategory'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productCategory:updateProductCategory')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateProductCategory, function (command, message) {
        return updateProductCategory(command.payload)
    })
})
