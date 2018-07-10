const userCommandHandlers = require('./user')

module.exports = {
    ...userCommandHandlers(),
}