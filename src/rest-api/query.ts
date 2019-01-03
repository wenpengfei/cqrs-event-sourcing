import * as express from 'express'
const bodyParser = require('body-parser')
const debug = require('debug')('cqrs:api')
import { sequelize, ProductCategory, ProductSku, ProductCategoryAttribute, Product, ProductAttribute } from '../persistents/mysql/adapter/makeMysqlClient'

const app = express()
const port = 7879

const cors = require('cors')
app.use(cors())
const order = [
    ['createdAt', 'DESC']
]
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const successResponse = { statusCode: 200 }

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.json({ statusCode: 500, message: err })
}

app.get('/productCategory', async (req, res) => {
    const pageSize = parseInt(req.query.pageSize || 10)
    const pageIndex = parseInt(req.query.pageIndex || 1)
    const totalSize = await ProductCategory.findAndCount()
    const productCategories = await ProductCategory.findAll({
        order,
        limit: pageSize,
        offset: (pageIndex - 1) * pageSize
    })
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: productCategories })
})

app.get('/productCategory/all', async (req, res) => {
    const productCategories = await ProductCategory.findAll()
    res.json(productCategories)
})

app.get('/productCategory/rootCategories', async (req, res) => {
    const productCategories = await ProductCategory.findAll({ where: { parent: '' } })
    res.json(productCategories)
})

app.get('/productCategory/:productCategoryId/attributes', async (req, res) => {
    const productCategoryAttributes = await ProductCategoryAttribute.findAll({ order, where: { productCategoryId: req.params.productCategoryId } })
    res.json(productCategoryAttributes)
})

app.get('/product', async (req, res) => {
    const pageSize = parseInt(req.query.pageSize || 10)
    const pageIndex = parseInt(req.query.pageIndex || 1)
    const totalSize = await Product.findAndCount()
    const products = await Product.findAll({
        order,
        limit: pageSize,
        offset: (pageIndex - 1) * pageSize
    })
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: products })
})

app.get('/product/:productId/attributes', async (req, res) => {
    const productAttributes = await sequelize.query(`
        SELECT pa.*, pca.name from (
            SELECT * from productAttributes WHERE productId = '${req.params.productId}'
            ) as pa 
        INNER JOIN productCategoryAttributes as pca 
        ON pa.productCategoryAttributeId = pca.productCategoryAttributeId
    `, { type: sequelize.QueryTypes.SELECT })
    console.log(productAttributes)
    res.json(productAttributes)
})

app.get('/productSku', async (req, res) => {
    const { productId } = req.query
    const pageSize = parseInt(req.query.pageSize || 10)
    const pageIndex = parseInt(req.query.pageIndex || 1)
    const totalSize = await ProductSku.findAndCount({ where: { productId } })
    const productSkus = await ProductSku.findAll(
        {
            where: { productId },
            order,
            limit: pageSize,
            offset: (pageIndex - 1) * pageSize
        })
    res.json({ pageSize, pageIndex, totalSize: totalSize.count, data: productSkus })
})


app.use(errorHandler)
app.listen(port, () => console.log(`query service listening on port ${port}!`))