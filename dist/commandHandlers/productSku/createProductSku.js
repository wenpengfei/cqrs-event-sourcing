"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../infrastructure/commands");
const createProductSku_1 = require("../../domain/entities/productSku/createProductSku");
const cqrs_lite_1 = require("cqrs-lite");
const debug = require('debug')('cqrs:commandHandlers:productSku:createProductSku');
const commandExecutor = new cqrs_lite_1.CommandExecutor();
commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
});
commandExecutor.on('connected', () => {
    commandExecutor.execute(commands_1.default.createProductSku, function (command, message) {
        return createProductSku_1.default(command.payload);
    });
});
