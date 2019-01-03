import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
const debug = require('debug')('cqrs:eventHandles:product:productUpdated:mysql')
import { Product, ProductAttribute } from '../../../persistents/mysql/adapter/makeMysqlClient'
import { ProductProps } from './../../../domain/types/product';
const uuid = require('uuid')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productUpdated, async function (event, message) {
        const version = event.version
        const { productId, name, guidePrice, costPrice, productCategoryId, defaultImgUrl, productCategoryPath } = event.payload
        await Product.update({ name, guidePrice, costPrice, productCategoryId, defaultImgUrl, version, productCategoryPath }, { where: { productId, version: version - 1 } })
    })
})
