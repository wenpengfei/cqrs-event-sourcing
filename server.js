const uuid = require('uuid/v1')

const CommandBus = require('./write-site/infrastructure/commandBus')
const commandBus = new CommandBus()

commandBus.connect()
commandBus.on('connected', () => {
    const commandId = uuid()
    const aggregateId = uuid()
    const command = {
        name: 'createUser',
        commandId,
        aggregateId,
        version: 0,
        timestamp: new Date(),
        payload: {
            userId: aggregateId,
            userName: 'asfsasa',
            password: 'sb'
        }
    }
    commandBus.publish(command.name, command)
})
