import * as events from '../../infrastructure/events'

const initialState = {
}

const reducer = (acc, current) => {
    switch (current.type) {
        default:
            return initialState
    }
}

const reduceToProductCategoryAttribute = (history) => {
    if (!Array.isArray(history)) {
        throw 'history must be an array'
    }
    return history.reduce(reducer, initialState)
}

export default reduceToProductCategoryAttribute