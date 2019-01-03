import * as express from 'express'
const { EventStore, CommandBus } = require('cqrs-lite')
const bodyParser = require('body-parser')
const debug = require('debug')('cqrs:api')
const uuid = require('uuid')
import * as R from 'ramda'
import commands from "../infrastructure/commands";
import { ProductProps } from "../domain/types/product";
import { ProductSkuProps } from "../domain/types/productSku";
import cqrsLite from "cqrs-lite/dist/types";
import { ProductCategoryAttributeProps } from "../domain/types/productCategoryAttribute";
import { ProductAttributeProps } from "../domain/types/productAttribute";
const assert = require('assert')

const commandBus = new CommandBus()
commandBus.connect()

const app = express()
const port = 7878

const cors = require('cors')
app.use(cors())

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

const enhanceCommand = (command) => {
    const timestamp = (new Date()).valueOf()
    return Object.assign(command, { timestamp, commandId: uuid() })
}

const transferRequestToCreateCommand = (body) => (key) => (commandName) => {
    const payload = Object.assign(body, { [key]: uuid() })
    const command = {
        name: commandName,
        aggregateId: payload[key],
        version: 1,
        payload,
    }
    return enhanceCommand(command)
}

const transferRequestToModifyCommand = (body) => (key) => (commandName) => {
    console.log(body)
    const { version } = body
    const command = {
        name: commandName,
        aggregateId: body[key],
        payload: body,
        version
    }
    return enhanceCommand(command)
}

const requestHandler = (transferHandler) => (commandName, key) => (req, res) => {
    console.log(req.body)
    const command = transferHandler(req.body)(key)(commandName)
    commandBus.publish(command.name, command)
    res.json(successResponse)
}

app.route('/productCategory')
    .post(requestHandler(transferRequestToCreateCommand)(commands.createProductCategory, 'productCategoryId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands.updateProductCategory, 'productCategoryId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands.deleteProductCategory, 'productCategoryId'))

app.route('/productCategoryAttribute')
    .post(requestHandler(transferRequestToCreateCommand)(commands.createProductCategoryAttribute, 'productCategoryAttributeId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands.updateProductCategoryAttribute, 'productCategoryAttributeId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands.deleteProductCategoryAttribute, 'productCategoryAttributeId'))

app.route('/productAttribute')
    .post(requestHandler(transferRequestToCreateCommand)(commands.createProductAttribute, 'productAttributeId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands.updateProductAttribute, 'productAttributeId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands.deleteProductAttribute, 'productAttributeId'))

app.route('/product')
    .post(requestHandler(transferRequestToCreateCommand)(commands.createProduct, 'productId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands.updateProduct, 'productId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands.deleteProduct, 'productId'))

app.route('/productSku')
    .post(requestHandler(transferRequestToCreateCommand)(commands.createProductSku, 'productSkuId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands.updateProductSku, 'productSkuId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands.deleteProductSku, 'productSkuId'))

app.use(errorHandler)
app.listen(port, () => console.log(`command service listening on port ${port}!`))