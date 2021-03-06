import { DomainError } from 'cqrs-lite'
import { ProductAttributeProps } from './../../types/productAttribute';
import events from '../../../infrastructure/events'

/**
 * @api {post} /command updateProductAttribute
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductAttribute }
 * @apiName updateProductAttribute
 *
 * @apiHeader {string} name updateProductAttribute
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (productAttribute: ProductAttributeProps) => {
  const { productAttributeId, productId, productCategoryAttributeId, value, imgUrl } = productAttribute
  return {
    type: events.productAttributeUpdated,
    payload: {
      productAttributeId,
      productId,
      productCategoryAttributeId,
      value,
      imgUrl
    }
  }
}
