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
    eventExecutor.execute(events.productSkuUpdated, async function (event, message) {
        const version = event.version
        const { productSkuId, stock, price, barCode, name, note }: ProductSkuProps = event.payload
        await ProductSku.update({ stock, price, barCode, version, name, note }, { where: { productSkuId, version: version - 1 } })
    })
})
