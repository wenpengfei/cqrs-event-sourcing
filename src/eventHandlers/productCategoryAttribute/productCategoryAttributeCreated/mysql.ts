import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductCategoryAttributeProps } from '../../../domain/types/productCategoryAttribute';
import { ProductCategoryAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient';
const debug = require('debug')('cqrs:eventHandles:productCategoryAttribute:productCategoryAttributeCreated:mysql')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCategoryAttributeCreated, async function (event, message) {
        const { version } = event
        const { productCategoryAttributeId, productCategoryId, name, note }: ProductCategoryAttributeProps = event.payload
        await ProductCategoryAttribute.create({ productCategoryAttributeId, productCategoryId, name, note, version })
    })
})
