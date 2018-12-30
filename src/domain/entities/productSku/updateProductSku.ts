import { DomainError } from 'cqrs-lite'
import events from '../../../infrastructure/events'
import { ProductSkuProps } from './../../types/productSku';

/**
 * @api {post} /command updateProductSku
 *
 * @apiVersion 1.0.0
 * @apiGroup ProductSku }
 * @apiName updateProductSku
 *
 * @apiHeader {string} name updateProductSku
 * @apiHeader {string} token 访问令牌
 * @apiHeader {string} aggregateId 聚合根Id
 * @apiHeader {string} commandId 命令Id
 * 
 * @apiParam {string} example example
 *
 * @apiSuccess {number} StatusCode 状态码
 */
export default (productSku: ProductSkuProps) => {
  const { productSkuId, stock, price, barCode }: ProductSkuProps = productSku
  return {
    type: events.productSkuUpdated,
    payload: {
      productSkuId,
      stock,
      price,
      barCode
    }
  }
}
