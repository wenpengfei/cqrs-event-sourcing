import { ProductProps } from './../../types/product';
import { DomainError } from 'cqrs-lite'
import events from '../../../infrastructure/events'

/**
 * @api {post} /command productDeleted
 *
 * @apiVersion 1.0.0
 * @apiGroup Product }
 * @apiName productDeleted
 *
 * @apiHeader {string} name productDeleted
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (product: ProductProps) => {
  const { productId } = product

  return {
    type: events.productDeleted,
    payload: {
      productId
    }
  }
}
