"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_lite_1 = require("cqrs-lite");
const events_1 = require("../../../infrastructure/events");
const debug = require('debug')('cqrs:eventHandles:productSku:productSkuCreated:mysql');
const makeMysqlClient_1 = require("../../../persistents/mysql/adapter/makeMysqlClient");
const uuid = require('uuid');
const eventExecutor = new cqrs_lite_1.EventExecutor();
eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
});
eventExecutor.on('connected', () => {
    eventExecutor.execute(events_1.default.productSkuCreated, function (event, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const version = event.version;
            const { productSkuId, productId, name, productSkuItems, stock, price, barCode, note } = event.payload;
            yield makeMysqlClient_1.ProductSku.create({ productSkuId, productId, stock, price, barCode, version, name, note });
            if (productSkuItems && productSkuItems.length > 0) {
                const productSkuItemsList = productSkuItems.map(item => {
                    return {
                        productSkuId: productSkuId,
                        productAttributeId: item.productAttributeId
                    };
                });
                yield makeMysqlClient_1.ProductSkuItem.bulkCreate(productSkuItemsList);
            }
        });
    });
});
