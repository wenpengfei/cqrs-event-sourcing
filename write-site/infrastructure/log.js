const logFactory = require('debug');

module.exports = (namespace) => {
    const debug = logFactory(namespace)
    const error = logFactory(namespace)
    const log = (...args) => {
        console.log(...args)
    }
    error.log = (...args) => {
        console.error(...args)
    }
    return {
        log,
        debug,
        error,
    }
}
