import { DomainError } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductSkuProps } from './../../types/productSku';

/**
 * @api {post} /command deleteProductSku
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductSku }
 * @apiName deleteProductSku
 *
 * @apiHeader {string} name deleteProductSku
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (productSku: ProductSkuProps) => {
  const { productSkuId }: ProductSkuProps = productSku
  return {
    type: events.productSkuDeleted,
    payload: {
      productSkuId,
    }
  }
}
