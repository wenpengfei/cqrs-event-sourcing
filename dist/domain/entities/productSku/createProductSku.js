"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command createProductSku
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductSku }
 * @apiName createProductSku
 *
 * @apiHeader {string} name createProductSku
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productSku) => {
    const { productSkuId, name, note, productId, productSkuItems, stock, price, barCode } = productSku;
    return {
        type: events_1.default.productSkuCreated,
        payload: {
            name,
            note,
            productSkuId,
            productId,
            productSkuItems,
            stock,
            price,
            barCode
        }
    };
};
