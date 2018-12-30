"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {};
const reducer = (acc, current) => {
    switch (current.type) {
        default:
            return initialState;
    }
};
const reduceToProductSku = (history) => {
    if (!Array.isArray(history)) {
        throw 'history must be an array';
    }
    return history.reduce(reducer, initialState);
};
exports.default = reduceToProductSku;
