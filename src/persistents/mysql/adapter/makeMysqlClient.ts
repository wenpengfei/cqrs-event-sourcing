import { ProductCategoryProps } from './../../../domain/types/productCategory';
import { ProductProps } from './../../../domain/types/product';
import { ProductSkuProps, ProductSkuItemProps } from '../../../domain/types/productSku';
import { Instance, Model } from 'sequelize';
import { ProductCategoryAttributeProps } from '../../../domain/types/productCategoryAttribute';
import { ProductAttributeProps } from '../../../domain/types/productAttribute';
import * as Sequelize from 'sequelize'

const sequelize = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        insecureAuth: true
    }
})

interface ProductInstance extends Sequelize.Instance<ProductProps>, ProductProps { }
interface ProductAttributeInstance extends Sequelize.Instance<ProductAttributeProps>, ProductAttributeProps { }
interface ProductCategoryInstance extends Sequelize.Instance<ProductCategoryProps>, ProductCategoryProps { }
interface ProductCategoryAttributeInstance extends Sequelize.Instance<ProductCategoryAttributeProps>, ProductCategoryAttributeProps { }
interface ProductSkuInstance extends Sequelize.Instance<ProductSkuProps>, ProductSkuProps { }
interface ProductSkuItemInstance extends Sequelize.Instance<ProductSkuItemProps>, ProductSkuItemProps { }

const Product = sequelize.define<ProductInstance, ProductProps>('product', {
    productId: { type: Sequelize.UUID(), field: 'productId', primaryKey: true },
    productCategoryId: { type: Sequelize.UUID(), field: 'productCategoryId' },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    defaultImgUrl: { type: Sequelize.STRING({ length: 100 }), field: 'defaultImgUrl' },
    guidePrice: { type: Sequelize.INTEGER, field: 'guidePrice' },
    costPrice: { type: Sequelize.INTEGER, field: 'costPrice' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true })

const ProductAttribute = sequelize.define<ProductAttributeInstance, ProductAttributeProps>('productAttribute', {
    productAttributeId: { type: Sequelize.UUID(), field: 'productAttributeId', primaryKey: true },
    productId: { type: Sequelize.UUID(), field: 'productId' },
    productCategoryAttributeId: { type: Sequelize.UUID(), field: 'productCategoryAttributeId' },
    value: { type: Sequelize.STRING({ length: 100 }), field: 'value' },
    imgUrl: { type: Sequelize.STRING({ length: 100 }), field: 'imgUrl' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true })

const ProductCategory = sequelize.define<ProductCategoryInstance, ProductCategoryProps>('productCategory', {
    productCategoryId: { type: Sequelize.UUID(), field: 'productCategoryId', primaryKey: true },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    path: { type: Sequelize.STRING({ length: 100 }), field: 'path' },
    note: { type: Sequelize.STRING({ length: 100 }), field: 'note' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true })

const ProductCategoryAttribute = sequelize.define<ProductCategoryAttributeInstance, ProductCategoryAttributeProps>('productCategoryAttribute', {
    productCategoryAttributeId: { type: Sequelize.UUID(), field: 'productCategoryAttributeId', primaryKey: true },
    productCategoryId: { type: Sequelize.UUID(), field: 'productCategoryId' },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    note: { type: Sequelize.STRING({ length: 100 }), field: 'note' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true })

const ProductSku = sequelize.define<ProductSkuInstance, ProductSkuProps>('productSku', {
    productSkuId: { type: Sequelize.UUID(), field: 'productSkuId', primaryKey: true },
    productId: { type: Sequelize.UUID(), field: 'productId' },
    stock: { type: Sequelize.INTEGER, field: 'stock' },
    price: { type: Sequelize.DECIMAL(12, 2), field: 'price' },
    barCode: { type: Sequelize.STRING({ length: 100 }), field: 'barCode' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true })

const ProductSkuItem = sequelize.define<ProductSkuItemInstance, ProductSkuItemProps>('productSkuItem', {
    productSkuId: { type: Sequelize.UUID(), field: 'productSkuId' },
    productAttributeId: { type: Sequelize.UUID(), field: 'productAttributeId' },
}, { timestamps: true })

if (process.env.NODE_ENV === 'development') {
    sequelize.sync()
}

export {
    Product,
    ProductAttribute,
    ProductCategory,
    ProductCategoryAttribute,
    ProductSku,
    ProductSkuItem,
    sequelize,
}
