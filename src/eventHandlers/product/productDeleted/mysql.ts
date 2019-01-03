import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
const debug = require('debug')('cqrs:eventHandles:product:productDeleted:mysql')
import { Product, ProductAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient'

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productDeleted, async function (event, message) {
        const version = event.version
        const { productId } = event.payload
        await Product.destroy({ where: { productId, version: version - 1 } })
        await ProductAttribute.destroy({ where: { productId } })
    })
})
