import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductAttributeProps } from '../../../domain/types/productAttribute';
import { ProductAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient';
const debug = require('debug')('cqrs:eventHandles:productAttribute:productAttributeDeleted:mysql')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productAttributeDeleted, async function (event, message) {
        const { version } = event
        const { productAttributeId }: ProductAttributeProps = event.payload
        await ProductAttribute.destroy({ where: { productAttributeId, version: version - 1 } })
    })
})
