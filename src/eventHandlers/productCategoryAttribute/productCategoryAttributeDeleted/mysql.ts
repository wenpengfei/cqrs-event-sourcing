import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductCategoryAttributeProps } from '../../../domain/types/productCategoryAttribute';
import { ProductCategoryAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient';
const debug = require('debug')('cqrs:eventHandles:productCategoryAttribute:productCategoryAttributeDeleted:mysql')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCategoryAttributeDeleted, async function (event, message) {
        const { version } = event
        const { productCategoryAttributeId }: ProductCategoryAttributeProps = event.payload
        await ProductCategoryAttribute.destroy({ where: { productCategoryAttributeId, version: version - 1 } })
    })
})
