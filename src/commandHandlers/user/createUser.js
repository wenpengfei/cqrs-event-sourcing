const commands = require('../../infrastructure/commands')
const createUser = require('../../domain/entities/user/create')
const { CommandExecutor } = require('cqrs-lite')
const debug = require('debug')('cqrs:commandHandlers:user:createUser')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createUser, function (command, message) {
        debug(command)
        const { userId, userName, password } = command.payload
        return createUser(userId, userName, password)
    })
})

