"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command productUpdated
 *
 * @apiVersion 1.0.0
 * @apiGroup Product }
 * @apiName productUpdated
 *
 * @apiHeader {string} name productUpdated
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (product) => {
    const { productId, name, guidePrice, costPrice, productCategoryId, productCategoryPath, defaultImgUrl } = product;
    return {
        type: events_1.default.productUpdated,
        payload: {
            productId,
            name,
            guidePrice,
            costPrice,
            productCategoryId,
            productCategoryPath,
            defaultImgUrl
        }
    };
};
