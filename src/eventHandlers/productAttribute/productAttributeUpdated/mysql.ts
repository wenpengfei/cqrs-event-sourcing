import { ProductAttributeProps } from './../../../domain/types/productAttribute';
import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient';
const debug = require('debug')('cqrs:eventHandles:productAttribute:productAttributeUpdated:mysql')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productAttributeUpdated, async function (event, message) {
        const { version } = event
        const { productAttributeId }: ProductAttributeProps = event.payload
        await ProductAttribute.update({ ...event.payload, version }, { where: { productAttributeId, version: version - 1 } })
    })
})
