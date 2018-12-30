"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command updateProductSku
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductSku }
 * @apiName updateProductSku
 *
 * @apiHeader {string} name updateProductSku
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productSku) => {
    const { productSkuId, stock, price, barCode } = productSku;
    return {
        type: events_1.default.productSkuUpdated,
        payload: {
            productSkuId,
            stock,
            price,
            barCode
        }
    };
};
