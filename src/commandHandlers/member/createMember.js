const commands = require('../../infrastructure/commands')
const createMember = require('../../domain/entities/member/createMember')
const { CommandExecutor } = require('cqrs-lite')
const debug = require('debug')('cqrs:commandHandlers:member:createMember')

const commandExecutor = new CommandExecutor()

commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
})

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createMember, function (command, message) {
        debug(command)
        return createMember()
    })
})
