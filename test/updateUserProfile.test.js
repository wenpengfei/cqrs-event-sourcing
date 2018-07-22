const uuid = require('uuid/v1')
const { EventStore, CommandBus } = require('cqrs-lite')
const reduceToUser = require('../src/domain/reducers/user')
const commandBus = new CommandBus()

test('updateUserProfile', async () => {
    const commandId = uuid()
    const command = {
        name: 'updateUserProfile',
        commandId,
        aggregateId: 'e973c201-8d5e-11e8-b703-afd1f7541177',
        version: 4,
        timestamp: new Date(),
        payload: {
            userId: 'e973c201-8d5e-11e8-b703-afd1f7541177',
            userName: '第四次修改',
        }
    }
    await commandBus.connect()
    await commandBus.publish(command.name, command)
})
