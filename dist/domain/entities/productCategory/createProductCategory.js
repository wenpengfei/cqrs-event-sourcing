"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../infrastructure/events");
/**
 * @api {post} /productCategory productCategoryCreated
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductCategory }
 * @apiName productCategoryCreated
 *
 * @apiHeader {string} name productCategoryCreated
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
        type: events_1.default.productCategoryCreated,
        payload: {
            productCategoryId,
            name,
            path,
            parent,
            note,
        }
    };
};
