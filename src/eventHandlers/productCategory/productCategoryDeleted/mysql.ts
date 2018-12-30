import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
const debug = require('debug')('cqrs:eventHandles:productCategory:productCategoryDeleted:mysql')
import { ProductCategory, ProductCategoryAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient'

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCategoryDeleted, async function (event, message) {
        const { productCategoryId } = event.payload
        const { version } = event
        await ProductCategory.destroy({ where: { productCategoryId, version: version -1 } })
    })
})
