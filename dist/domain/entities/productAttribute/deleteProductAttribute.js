"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command deleteProductAttribute
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductAttribute }
 * @apiName deleteProductAttribute
 *
 * @apiHeader {string} name deleteProductAttribute
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productAttribute) => {
    console.log('evt', productAttribute);
    const { productAttributeId, productId, productCategoryAttributeId, value, imgUrl } = productAttribute;
    return {
        type: events_1.default.productAttributeDeleted,
        payload: {
            productAttributeId,
        }
    };
};
