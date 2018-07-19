const commands = require('../../infrastructure/commands')
const { CommandExecutor } = require('cqrs-lite')
const updateUser = require('../../domain/entities/user/update')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateUser, function (command, message) {
        const { userId, userName, password } = command.payload
        return updateUser(userId, userName, password)
    })
})
