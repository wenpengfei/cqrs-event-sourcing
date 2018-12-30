import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import deleteProductCategoryAttribute from '../../domain/entities/productCategoryAttribute/deleteProductCategoryAttribute'

const debug = require('debug')('cqrs:commandHandlers:productCategoryAttribute:deleteProductCategoryAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.deleteProductCategoryAttribute, function (command, message) {
        console.log(command)
        return deleteProductCategoryAttribute(command.payload)
    })
})
