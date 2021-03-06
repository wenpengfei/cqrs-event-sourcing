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
const makeMysqlClient_1 = require("../../../persistents/mysql/adapter/makeMysqlClient");
const debug = require('debug')('cqrs:eventHandles:productCategoryAttribute:productCategoryAttributeDeleted:mysql');
const eventExecutor = new cqrs_lite_1.EventExecutor();
eventExecutor.init({
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
});
eventExecutor.on('connected', () => {
    eventExecutor.execute(events_1.default.productCategoryAttributeDeleted, function (event, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { version } = event;
            const { productCategoryAttributeId } = event.payload;
            yield makeMysqlClient_1.ProductCategoryAttribute.destroy({ where: { productCategoryAttributeId, version: version - 1 } });
        });
    });
});
