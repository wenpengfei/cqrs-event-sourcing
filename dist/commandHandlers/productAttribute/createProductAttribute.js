"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_lite_1 = require("cqrs-lite");
const commands_1 = require("../../infrastructure/commands");
const createProductAttribute_1 = require("../../domain/entities/productAttribute/createProductAttribute");
const debug = require('debug')('cqrs:commandHandlers:productAttribute:createProductAttribute');
const commandExecutor = new cqrs_lite_1.CommandExecutor();
commandExecutor.init({
    commandBusUrl: 'amqp://localhost',
    eventBusUrl: 'amqp://localhost',
    eventStoreUrl: 'mongodb://localhost:27017/event-source',
    commandStoreUrl: 'mongodb://localhost:27017/event-source'
});
commandExecutor.on('connected', () => {
    commandExecutor.execute(commands_1.default.createProductAttribute, function (command, message) {
        return createProductAttribute_1.default(command.payload);
    });
});
