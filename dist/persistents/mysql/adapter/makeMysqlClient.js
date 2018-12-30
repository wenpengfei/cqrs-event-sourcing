"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const sequelize = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        insecureAuth: true
    }
}, {
    operatorsAliases: false,
});
exports.sequelize = sequelize;
const Product = sequelize.define('product', {
    productId: { type: Sequelize.STRING({ length: 100 }), field: 'productId', primaryKey: true },
    productCategoryId: { type: Sequelize.STRING({ length: 100 }), field: 'productCategoryId' },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    defaultImgUrl: { type: Sequelize.STRING({ length: 100 }), field: 'defaultImgUrl' },
    guidePrice: { type: Sequelize.INTEGER, field: 'guidePrice' },
    costPrice: { type: Sequelize.INTEGER, field: 'costPrice' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true });
exports.Product = Product;
const ProductAttribute = sequelize.define('productAttribute', {
    productAttributeId: { type: Sequelize.STRING({ length: 100 }), field: 'productAttributeId', primaryKey: true },
    productId: { type: Sequelize.STRING({ length: 100 }), field: 'productId' },
    productCategoryAttributeId: { type: Sequelize.STRING({ length: 100 }), field: 'productCategoryAttributeId' },
    value: { type: Sequelize.STRING({ length: 100 }), field: 'value' },
    imgUrl: { type: Sequelize.STRING({ length: 100 }), field: 'imgUrl' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true });
exports.ProductAttribute = ProductAttribute;
const ProductCategory = sequelize.define('productCategory', {
    productCategoryId: { type: Sequelize.STRING({ length: 100 }), field: 'productCategoryId', primaryKey: true },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    path: { type: Sequelize.STRING({ length: 100 }), field: 'path' },
    note: { type: Sequelize.STRING({ length: 100 }), field: 'note' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true });
exports.ProductCategory = ProductCategory;
const ProductCategoryAttribute = sequelize.define('productCategoryAttribute', {
    productCategoryAttributeId: { type: Sequelize.STRING({ length: 100 }), field: 'productCategoryAttributeId', primaryKey: true },
    productCategoryId: { type: Sequelize.STRING({ length: 100 }), field: 'productCategoryId' },
    name: { type: Sequelize.STRING({ length: 100 }), field: 'name' },
    note: { type: Sequelize.STRING({ length: 100 }), field: 'note' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true });
exports.ProductCategoryAttribute = ProductCategoryAttribute;
const ProductSku = sequelize.define('productSku', {
    productSkuId: { type: Sequelize.STRING({ length: 100 }), field: 'productSkuId', primaryKey: true },
    productId: { type: Sequelize.STRING({ length: 100 }), field: 'productId' },
    stock: { type: Sequelize.INTEGER, field: 'stock' },
    price: { type: Sequelize.DECIMAL, field: 'price' },
    barCode: { type: Sequelize.STRING({ length: 100 }), field: 'barCode' },
    version: { type: Sequelize.INTEGER, field: 'version' },
}, { timestamps: true });
exports.ProductSku = ProductSku;
const ProductSkuItem = sequelize.define('productSkuItem', {
    productSkuId: { type: Sequelize.STRING({ length: 100 }), field: 'productSkuId' },
    productAttributeId: { type: Sequelize.STRING({ length: 100 }), field: 'productAttributeId' },
}, { timestamps: true });
exports.ProductSkuItem = ProductSkuItem;
if (process.env.NODE_ENV === 'development') {
    sequelize.sync();
}
