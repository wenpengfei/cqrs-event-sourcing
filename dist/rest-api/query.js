"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require('body-parser');
const debug = require('debug')('cqrs:api');
const makeMysqlClient_1 = require("../persistents/mysql/adapter/makeMysqlClient");
const app = express();
const port = 7879;
const cors = require('cors');
app.use(cors());
const order = [
    ['createdAt', 'DESC']
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const successResponse = { statusCode: 200 };
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.json({ statusCode: 500, message: err });
};
app.get('/productCategory', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const pageSize = parseInt(req.query.pageSize || 10);
    const pageIndex = parseInt(req.query.pageIndex || 1);
    const totalSize = yield makeMysqlClient_1.ProductCategory.findAndCount();
    const productCategories = yield makeMysqlClient_1.ProductCategory.findAll({
        order,
        limit: pageSize,
        offset: (pageIndex - 1) * pageSize
    });
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: productCategories });
}));
app.get('/productCategory/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const productCategories = yield makeMysqlClient_1.ProductCategory.findAll();
    res.json(productCategories);
}));
app.get('/productCategory/rootCategories', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const productCategories = yield makeMysqlClient_1.ProductCategory.findAll({ where: { parent: '' } });
    res.json(productCategories);
}));
app.get('/productCategory/:productCategoryId/attributes', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const productCategoryAttributes = yield makeMysqlClient_1.ProductCategoryAttribute.findAll({ order, where: { productCategoryId: req.params.productCategoryId } });
    res.json(productCategoryAttributes);
}));
app.get('/product', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const pageSize = parseInt(req.query.pageSize || 10);
    const pageIndex = parseInt(req.query.pageIndex || 1);
    const totalSize = yield makeMysqlClient_1.Product.findAndCount();
    const products = yield makeMysqlClient_1.Product.findAll({
        order,
        limit: pageSize,
        offset: (pageIndex - 1) * pageSize
    });
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: products });
}));
app.get('/product/:productId/attributes', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const productAttributes = yield makeMysqlClient_1.sequelize.query(`
        SELECT pa.*, pca.name from (
            SELECT * from productAttributes WHERE productId = '${req.params.productId}'
            ) as pa 
        INNER JOIN productCategoryAttributes as pca 
        ON pa.productCategoryAttributeId = pca.productCategoryAttributeId
    `, { type: makeMysqlClient_1.sequelize.QueryTypes.SELECT });
    console.log(productAttributes);
    res.json(productAttributes);
}));
app.get('/productSku', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { productId } = req.query;
    const pageSize = parseInt(req.query.pageSize || 10);
    const pageIndex = parseInt(req.query.pageIndex || 1);
    const totalSize = yield makeMysqlClient_1.ProductSku.findAndCount({ where: { productId } });
    const productSkus = yield makeMysqlClient_1.ProductSku.findAll({
        where: { productId },
        order,
        limit: pageSize,
        offset: (pageIndex - 1) * pageSize
    });
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: productSkus });
}));
app.use(errorHandler);
app.listen(port, () => console.log(`query service listening on port ${port}!`));
