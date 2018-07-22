const uuid = require('uuid/v1')
const { EventStore, CommandBus } = require('cqrs-lite')
const reduceToUser = require('../src/domain/reducers/user')
const commandBus = new CommandBus()

test('createUser', async () => {
    const commandId = uuid()
    const aggregateId = uuid()
    const command = {
        name: 'createUser',
        commandId,
        aggregateId,
        version: 1,
        timestamp: new Date(),
        payload: {
            userId: aggregateId,
            userName: '新的',
            password: 'ffff'
        }
    }
    await commandBus.connect()
    await commandBus.publish(command.name, command)
})
