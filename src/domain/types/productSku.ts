export interface ProductSkuProps {
    name?: string,
    note?: string,
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