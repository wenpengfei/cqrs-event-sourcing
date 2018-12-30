import { CommandExecutor } from 'cqrs-lite'
import commands from '../../infrastructure/commands'
import updateProductCategoryAttribute from '../../domain/entities/productCategoryAttribute/updateProductCategoryAttribute'

const debug = require('debug')('cqrs:commandHandlers:productCategoryAttribute:updateProductCategoryAttribute')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateProductCategoryAttribute, function (command, message) {
        return updateProductCategoryAttribute(command.payload)
    })
})
