"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { EventStore, CommandBus } = require('cqrs-lite');
const bodyParser = require('body-parser');
const debug = require('debug')('cqrs:api');
const uuid = require('uuid');
const commands_1 = require("../infrastructure/commands");
const assert = require('assert');
const commandBus = new CommandBus();
commandBus.connect();
const app = express();
const port = 7878;
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
const enhanceCommand = (command) => {
    const timestamp = (new Date()).valueOf();
    return Object.assign(command, { timestamp, commandId: uuid() });
};
const transferRequestToCreateCommand = (body) => (key) => (commandName) => {
    const payload = Object.assign(body, { [key]: uuid() });
    const command = {
        name: commandName,
        aggregateId: payload[key],
        version: 1,
        payload,
    };
    return enhanceCommand(command);
};
const transferRequestToModifyCommand = (body) => (key) => (commandName) => {
    const { version } = body;
    const command = {
        name: commandName,
        aggregateId: body[key],
        payload: body,
        version
    };
    return enhanceCommand(command);
};
const requestHandler = (transferHandler) => (commandName, key) => (req, res) => {
    const command = transferHandler(req.body)(key)(commandName);
    commandBus.publish(command.name, command);
    res.json(successResponse);
};
app.route('/productCategory')
    .post(requestHandler(transferRequestToCreateCommand)(commands_1.default.createProductCategory, 'productCategoryId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands_1.default.updateProductCategory, 'productCategoryId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands_1.default.deleteProductCategory, 'productCategoryId'));
app.route('/productCategoryAttribute')
    .post(requestHandler(transferRequestToCreateCommand)(commands_1.default.createProductCategoryAttribute, 'productCategoryAttributeId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands_1.default.updateProductCategoryAttribute, 'productCategoryAttributeId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands_1.default.deleteProductCategoryAttribute, 'productCategoryAttributeId'));
app.route('/productAttribute')
    .post(requestHandler(transferRequestToCreateCommand)(commands_1.default.createProductAttribute, 'productAttributeId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands_1.default.updateProductAttribute, 'productAttributeId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands_1.default.deleteProductCategory, 'productAttributeId'));
app.route('/product')
    .post(requestHandler(transferRequestToCreateCommand)(commands_1.default.createProduct, 'productId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands_1.default.updateProduct, 'productId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands_1.default.deleteProduct, 'productId'));
app.route('/productSku')
    .post(requestHandler(transferRequestToCreateCommand)(commands_1.default.createProductSku, 'productSkuId'))
    .put(requestHandler(transferRequestToModifyCommand)(commands_1.default.updateProductSku, 'productSkuId'))
    .delete(requestHandler(transferRequestToModifyCommand)(commands_1.default.deleteProductSku, 'productSkuId'));
app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
