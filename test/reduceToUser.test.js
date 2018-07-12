const EventStore = require('../write-site/infrastructure/eventStore')
const reduceToUser = require('../write-site/domain/reducers/user')

test('reduceToUser', async () => {
    const eventStore = new EventStore()
    await eventStore.connect()
    const history = await eventStore.getEventStream('89a146c1-8586-11e8-a9a5-6bbe104e27f6')
    const userState = reduceToUser(history)
    expect(userState.userName).toEqual('sb')
    expect(userState.password).toEqual('sb')
})