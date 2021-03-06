"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command createProductCategoryAttribute
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductCategoryAttribute }
 * @apiName createProductCategoryAttribute
 *
 * @apiHeader {string} name createProductCategoryAttribute
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productCategoryAttribute) => {
    const { productCategoryAttributeId, productCategoryId, name, note } = productCategoryAttribute;
    return {
        type: events_1.default.productCategoryAttributeCreated,
        payload: {
            productCategoryAttributeId,
            productCategoryId,
            name,
            note
        }
    };
};
