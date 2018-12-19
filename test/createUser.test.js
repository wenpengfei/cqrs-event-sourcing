const uuid = require('uuid/v1')
const { EventStore, CommandBus } = require('cqrs-lite')
const commandBus = new CommandBus()

test('createUser', async () => {
    const commandId = uuid()
    const aggregateId = uuid()
    const command = {
        name: 'createMember',
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
    const db = await commandBus.connect()
    await commandBus.publish(command.name, command)
})
