const uuid = require('uuid/v1')
const { EventStore, CommandBus } = require('cqrs-lite')
const commands = require('../src/infrastructure/commands')

const commandBus = new CommandBus()

test('createMember', async () => {
    const commandId = uuid()
    const aggregateId = uuid()
    const command = {
        name: commands.createMember,
        commandId,
        aggregateId,
        version: 1,
        timestamp: new Date(),
        payload: {
            memberId: aggregateId,
            memberName: '新的',
        }
    }
    console.log('name' in command)
    const db = await commandBus.connect()
    await commandBus.publish(command.name, command)
})
