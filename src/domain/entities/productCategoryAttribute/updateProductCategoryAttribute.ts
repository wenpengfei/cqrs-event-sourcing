import { DomainError } from 'cqrs-lite'
import { ProductCategoryAttributeProps } from './../../types/productCategoryAttribute';
import events from '../../../infrastructure/events'

/**
 * @api {post} /command updateProductCategoryAttribute
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductCategoryAttribute }
 * @apiName updateProductCategoryAttribute
 *
 * @apiHeader {string} name updateProductCategoryAttribute
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (productCategoryAttribute: ProductCategoryAttributeProps) => {
  const { productCategoryAttributeId, productCategoryId, name, note } = productCategoryAttribute
  return {
    type: events.productCategoryAttributeUpdated,
    payload: {
      productCategoryAttributeId,
      productCategoryId,
      name,
      note
    }
  }
}
