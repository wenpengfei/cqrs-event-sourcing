const uuid = require('uuid/v1')
import { EventStore, CommandBus } from 'cqrs-lite'
import commands from '../src/infrastructure/commands'

const commandBus = new CommandBus()

test(commands.createProduct, async () => {
    const id = uuid()
    const command = {
        name: commands.createProduct,
        commandId: id,
        aggregateId: id,
        version: 1,
        timestamp: '123456',
        payload: {
            productId: id,
            name: '商品名称',
            guidePrice: 900,
            costPrice: 800,
            barcode: '123456',
            productCategoryId: '123456',
            attributes: 'xxxxxxxx',
        }
    }
    const db = await commandBus.connect()
    await commandBus.publish(command.name, command)
})

// test(commands.updateProduct, async () => {
//     const id = '363a4b70-05cf-11e9-8a7e-7580318acccb'
//     const command = {
//         name: commands.updateProduct,
//         commandId: uuid(),
//         aggregateId: id,
//         version: 6,
//         timestamp: new Date(),
//         payload: {
//             productId: id,
//             name: '1商品名称111',
//             guidePrice: 21900,
//             costPrice: 21800,
//             barcode: '21123456',
//             productCategoryId: '21123456',
//             attributes: '21xxxxxxxx',
//         }
//     }
//     const db = await commandBus.connect()
//     await commandBus.publish(command.name, command)
// })

// test(commands.deleteProduct, async () => {
//     const id = '363a4b70-05cf-11e9-8a7e-7580318acccb'
//     const command = {
//         name: commands.deleteProduct,
//         commandId: uuid(),
//         aggregateId: id,
//         version: 7,
//         timestamp: new Date(),
//         payload: {
//             productId: id,
//         }
//     }
//     const db = await commandBus.connect()
//     await commandBus.publish(command.name, command)
// })