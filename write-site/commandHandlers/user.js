const createUser = require('../domain/entities/user/create')
const updateUser = require('../domain/entities/user/update')

module.exports = {
  createUser: (payload) => {
    const { userName, password } = payload
    return createUser(userName, password)
  },
  updateUser: (payload) => {
    const { userName, password } = payload
    return updateUser(userName, password)
  }
}