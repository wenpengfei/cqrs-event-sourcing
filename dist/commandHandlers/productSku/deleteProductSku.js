"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../infrastructure/commands");
const deleteProductSku_1 = require("../../domain/entities/productSku/deleteProductSku");
const cqrs_lite_1 = require("cqrs-lite");
const debug = require('debug')('cqrs:commandHandlers:productSku:deleteProductSku');
const commandExecutor = new cqrs_lite_1.CommandExecutor();
commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
});
commandExecutor.on('connected', () => {
    commandExecutor.execute(commands_1.default.deleteProductSku, function (command, message) {
        return deleteProductSku_1.default(command.payload);
    });
});
