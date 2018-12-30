import { DomainError } from 'cqrs-lite'
import { ProductCategoryAttributeProps } from './../../types/productCategoryAttribute';
import events from '../../../infrastructure/events'

/**
 * @api {post} /command deleteProductCategoryAttribute
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductCategoryAttribute }
 * @apiName deleteProductCategoryAttribute
 *
 * @apiHeader {string} name deleteProductCategoryAttribute
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (productCategoryAttribute: ProductCategoryAttributeProps) => {
  const { productCategoryAttributeId } = productCategoryAttribute
  return {
    type: events.productCategoryAttributeDeleted,
    payload: {
      productCategoryAttributeId
    }
  }
}
