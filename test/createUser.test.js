const uuid = require('uuid/v1')

const EventStore = require('../write-site/infrastructure/eventStore')
const reduceToUser = require('../write-site/domain/reducers/user')
const CommandBus = require('../write-site/infrastructure/commandBus')
const commandBus = new CommandBus()


test('createUser', async () => {

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
            userName: 'nishisba',
            password: '====!!'
        }
    }

    await commandBus.connect()
    await commandBus.publish(command.name, command)

    setTimeout(async () => {
        const eventStore = new EventStore()
        await eventStore.connect()
        const history = await eventStore.getEventStream(aggregateId)
        const userState = reduceToUser(history)
        console.log('userState', userState)
        expect(userState.userId).toEqual(command.payload.userId)
        expect(userState.userName).toEqual(command.payload.userName)
        expect(userState.password).toEqual(command.payload.password)
    }, 3000);
})
