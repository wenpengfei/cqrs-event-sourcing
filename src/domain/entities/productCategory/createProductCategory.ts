import { DomainError } from 'cqrs-lite'
import uuid from 'uuid'
import events from '../../../infrastructure/events'
import { ProductCategoryProps } from './../../types/productCategory';

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
export default (productCategory: ProductCategoryProps) => {
  const { productCategoryId, name, path, note } = productCategory
  return {
    type: events.productCategoryCreated,
    payload: {
      productCategoryId,
      name,
      path,
      note,
    }
  }
}
