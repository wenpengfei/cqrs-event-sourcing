export interface ProductSkuProps {
    productSkuId?: string,
    productId?: string,
    productSkuItems?: Array<ProductSkuItemProps>
    stock?: number,
    price?: number,
    barCode?: string,
    version?: number,
}

export interface ProductSkuItemProps {
    productSkuId?: string,
    productAttributeId?: string,
}