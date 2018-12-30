import commands from '../../infrastructure/commands'
import createProductCategory from '../../domain/entities/productCategory/createProductCategory'
import { CommandExecutor } from 'cqrs-lite'
const debug = require('debug')('cqrs:commandHandlers:productCategory:createProductCategory')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createProductCategory, function (command, message) {
        return createProductCategory(command.payload)
    })
})
