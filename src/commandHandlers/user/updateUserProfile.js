const { CommandExecutor } = require('cqrs-lite')
const commands = require('../../infrastructure/commands')
const updateUserProfile = require('../../domain/entities/user/updateProfile')
const debug = require('debug')('cqrs:commandHandlers:user:updateUserProfile')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateUserProfile, function (command, message) {
        debug(command)
        const { userId, userName } = command.payload
        return updateUserProfile(userId, userName)
    })
})
