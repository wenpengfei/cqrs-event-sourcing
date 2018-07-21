// const uuid = require('uuid/v1')
// const { EventStore, CommandBus } = require('cqrs-lite')
// const reduceToUser = require('../src/domain/reducers/user')
// const commandBus = new CommandBus()

// test('updateUserProfile', async () => {
//     const commandId = uuid()
//     const command = {
//         name: 'updateUserProfile',
//         commandId,
//         aggregateId: 'b0ed0df0-8c2e-11e8-b52e-4ffee601b8f0',
//         version: 3,
//         timestamp: new Date(),
//         payload: {
//             userId: 'b0ed0df0-8c2e-11e8-b52e-4ffee601b8f0',
//             userName: '你大爷的啊爱上暗示法萨芬萨芬撒',
//         }
//     }
//     await commandBus.connect()
//     await commandBus.publish(command.name, command)
// })
