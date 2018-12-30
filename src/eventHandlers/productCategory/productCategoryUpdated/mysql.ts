import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductCategory, ProductCategoryAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient'
const debug = require('debug')('cqrs:eventHandles:productCategory:productCategoryUpdated:mysql')
import { ProductCategoryProps } from './../../../domain/types/productCategory';
const uuid = require('uuid')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCategoryUpdated, async function (event, message) {
        const version = event.version
        const { productCategoryId, name, path, note }: ProductCategoryProps = event.payload
        await ProductCategory.update({ name, path, note, version }, { where: { productCategoryId, version: version - 1 } })
    })
})
