const events = require('../../infrastructure/events')

const initialState = {
}

const reducer = (acc, current) => {
    switch (current.type) {
        default:
            return initialState
    }
}

const reduceToMember = (history) => {
    if (!Array.isArray(history)) {
        throw 'history must be an array'
    }
    return history.reduce(reducer, initialState)
}

module.exports = reduceToMember