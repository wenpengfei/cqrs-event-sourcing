import { ProductCategoryProps } from './../../../domain/types/productCategory';
import { EventExecutor } from 'cqrs-lite'
const uuid = require('uuid')
import events from '../../../infrastructure/events'
import { ProductCategory, ProductCategoryAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient'

const debug = require('debug')('cqrs:eventHandles:productCategory:productCategoryCreated:mysql')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCategoryCreated, async function (event, message) {
        const { version } = event
        const { productCategoryId, name, path, note }: ProductCategoryProps = event.payload
        await ProductCategory.create({ productCategoryId, name, path, note, version })
    })
})
