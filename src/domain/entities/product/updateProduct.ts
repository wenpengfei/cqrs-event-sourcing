import { DomainError } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductProps } from './../../types/product';

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
export default (product: ProductProps) => {
  const { productId, name, guidePrice, costPrice, productCategoryId, defaultImgUrl } = product
  return {
    type: events.productUpdated,
    payload: {
      productId,
      name,
      guidePrice,
      costPrice,
      productCategoryId,
      defaultImgUrl
    }
  }
}
