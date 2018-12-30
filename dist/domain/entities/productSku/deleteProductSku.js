"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command deleteProductSku
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductSku }
 * @apiName deleteProductSku
 *
 * @apiHeader {string} name deleteProductSku
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productSku) => {
    const { productSkuId } = productSku;
    return {
        type: events_1.default.productSkuDeleted,
        payload: {
            productSkuId,
        }
    };
};
