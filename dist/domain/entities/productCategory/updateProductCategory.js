"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /command productCategoryUpdated
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductCategory }
 * @apiName productCategoryUpdated
 *
 * @apiHeader {string} name productCategoryUpdated
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 *
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
exports.default = (productCategory) => {
    const { productCategoryId, name, parent, path, note } = productCategory;
    return {
        type: events_1.default.productCategoryUpdated,
        payload: {
            productCategoryId,
            name,
            parent,
            note,
            path,
        }
    };
};
