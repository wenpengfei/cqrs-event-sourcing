import { EventExecutor } from 'cqrs-lite'
import events from '../../../infrastructure/events'
const debug = require('debug')('cqrs:eventHandles:productSku:productSkuCreated:mysql')
import { ProductSkuProps, ProductSkuItemProps } from './../../../domain/types/productSku';
import { ProductSku, ProductSkuItem } from '../../../persistents/mysql/adapter/makeMysqlClient'
const uuid = require('uuid')

const eventExecutor = new EventExecutor()

eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
})

eventExecutor.on('connected', () => {
    eventExecutor.execute(events.productSkuCreated, async function (event, message) {
        const version = event.version
        const { productSkuId, productId, productSkuItems, stock, price, barCode }: ProductSkuProps = event.payload
        await ProductSku.create({ productSkuId, productId, stock, price, barCode, version })
        if (productSkuItems && productSkuItems.length > 0) {
            const productSkuItemsList = productSkuItems.map(item => {
                return {
                    productSkuId: productSkuId,
                    productAttributeId: item.productAttributeId
                }
            })
            await ProductSkuItem.bulkCreate(productSkuItemsList)
        }
    })
})

