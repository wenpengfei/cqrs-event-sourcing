import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import createProductCategoryAttribute from '../../domain/entities/productCategoryAttribute/createProductCategoryAttribute'

const debug = require('debug')('cqrs:commandHandlers:productCategoryAttribute:createProductCategoryAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createProductCategoryAttribute, function (command, message) {
        return createProductCategoryAttribute(command.payload)
    })
})
