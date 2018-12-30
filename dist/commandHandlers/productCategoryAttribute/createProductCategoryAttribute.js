"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_lite_1 = require("cqrs-lite");
const commands_1 = require("../../infrastructure/commands");
const createProductCategoryAttribute_1 = require("../../domain/entities/productCategoryAttribute/createProductCategoryAttribute");
const debug = require('debug')('cqrs:commandHandlers:productCategoryAttribute:createProductCategoryAttribute');
const commandExecutor = new cqrs_lite_1.CommandExecutor();
commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
});
commandExecutor.on('connected', () => {
    commandExecutor.execute(commands_1.default.createProductCategoryAttribute, function (command, message) {
        return createProductCategoryAttribute_1.default(command.payload);
    });
});
