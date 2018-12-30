"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
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
const enhanceCommand = (request) => {
    // const timestamp = Date.parse((new Date()).toString())
    // const { version } = command.payload
    // return R.pipe(
    //     R.merge({ timestamp, commandId: uuid(), version }),
    //     R.dissocPath(['payload', 'version'])
    // )(command)
    const timestamp = (new Date()).valueOf();
    return Object.assign(request, { timestamp, commandId: uuid() });
};
app.post('/productCategory', (req, res) => {
    const payload = Object.assign(req.body, { productCategoryId: uuid() });
    const { productCategoryId } = payload;
    const command = {
        name: commands_1.default.createProductCategory,
        aggregateId: productCategoryId,
        version: 1,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.put('/productCategory', (req, res) => {
    const payload = req.body;
    const { version } = payload;
    const { productCategoryId } = payload;
    const command = {
        name: commands_1.default.updateProductCategory,
        aggregateId: productCategoryId,
        payload,
        version
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.delete('/productCategory', (req, res) => {
    const payload = req.body;
    const { productCategoryId, version } = payload;
    const command = {
        name: commands_1.default.deleteProductCategory,
        aggregateId: productCategoryId,
        payload,
        version,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.post('/productCategoryAttribute', (req, res) => {
    const payload = Object.assign(req.body, { productCategoryAttributeId: uuid() });
    const { productCategoryAttributeId } = payload;
    const command = {
        name: commands_1.default.createProductCategoryAttribute,
        aggregateId: productCategoryAttributeId,
        version: 1,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.put('/productCategoryAttribute', (req, res) => {
    const payload = req.body;
    const { productCategoryAttributeId, version } = payload;
    const command = {
        name: commands_1.default.updateProductCategoryAttribute,
        aggregateId: productCategoryAttributeId,
        version,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.delete('/productCategoryAttribute', (req, res) => {
    const payload = req.body;
    const { productCategoryAttributeId, version } = payload;
    const command = {
        name: commands_1.default.deleteProductCategoryAttribute,
        aggregateId: productCategoryAttributeId,
        payload,
        version,
    };
    console.log(command);
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.post('/product', (req, res) => {
    const payload = Object.assign(req.body, { productId: uuid() });
    const { productId } = payload;
    const command = {
        name: commands_1.default.createProduct,
        aggregateId: productId,
        version: 1,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.put('/product', (req, res) => {
    const payload = req.body;
    const { productId, version } = payload;
    const command = {
        name: commands_1.default.updateProduct,
        aggregateId: productId,
        version,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.delete('/product', (req, res) => {
    const payload = req.body;
    const { productId, version } = payload;
    const command = {
        name: commands_1.default.deleteProduct,
        aggregateId: productId,
        payload,
        version,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.post('/productAttribute', (req, res) => {
    const payload = Object.assign(req.body, { productAttributeId: uuid() });
    const { productAttributeId } = payload;
    const command = {
        name: commands_1.default.createProductAttribute,
        aggregateId: productAttributeId,
        version: 1,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.put('/productAttribute', (req, res) => {
    const payload = req.body;
    const { productAttributeId, version } = payload;
    const command = {
        name: commands_1.default.updateProductAttribute,
        aggregateId: productAttributeId,
        version,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.delete('/productAttribute', (req, res) => {
    const payload = req.body;
    const { productAttributeId, version } = payload;
    const command = {
        name: commands_1.default.deleteProductAttribute,
        aggregateId: productAttributeId,
        payload,
        version,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.post('/productSku', (req, res) => {
    const payload = Object.assign(req.body, { productSkuId: uuid() });
    const { productSkuId } = payload;
    const command = {
        name: commands_1.default.createProductSku,
        aggregateId: productSkuId,
        version: 1,
        payload,
    };
    console.log(enhanceCommand(command));
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.put('/productSku', (req, res) => {
    const payload = req.body;
    const { productSkuId, version } = payload;
    const command = {
        name: commands_1.default.updateProductSku,
        aggregateId: productSkuId,
        version,
        payload,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.delete('/productSku', (req, res) => {
    const payload = req.body;
    const { productSkuId, version } = payload;
    const command = {
        name: commands_1.default.deleteProductSku,
        aggregateId: productSkuId,
        payload,
        version,
    };
    commandBus.publish(command.name, enhanceCommand(command));
    res.json(successResponse);
});
app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
