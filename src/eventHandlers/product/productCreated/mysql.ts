import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
const debug = require('debug')('cqrs:eventHandles:product:productCreated:mysql')
import { Product } from '../../../persistents/mysql/adapter/makeMysqlClient'
import { ProductProps } from './../../../domain/types/product';
const uuid = require('uuid')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productCreated, async function (event, message) {
        const version = event.version
        const { productId, name, guidePrice, costPrice, productCategoryId, defaultImgUrl } = event.payload
        await Product.create({ productId, name, guidePrice, costPrice, productCategoryId, defaultImgUrl, version })
    })
})
