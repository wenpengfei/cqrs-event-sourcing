const events = require('../../infrastructure/events')

const initialState = {
    userId: '',
    userName: '',
    password: '',
}

const reducer = (acc, curr) => {
    switch (curr.type) {
        case events.UserCreated:
            return {
                ...initialState,
                userId: curr.payload.userId
            }
        default:
            return initialState
    }
}

const reduceToUser = (history) => {
    if (!Array.isArray(history)) {
        throw 'history must be an array'
    }
    return history.reduce(reducer, initialState)
}

module.exports = reduceToUser