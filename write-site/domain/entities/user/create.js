const uuid = require('uuid/v1')

const createUser = (userName, password) => {
  const timestamp = new Date()
  const version = 0
  const aggregateId = uuid()
  const userId = uuid()
  const aggregate = 'user'

  if (!userName) {
    throw '用户名不能为空'
  }

  if (!password) {
    throw '密码不能为空'
  }

  return [
    {
      type: 'UserCreated',
      timestamp,
      aggregate,
      version,
      payload: {
        userId,
      }
    },
    {
      type: 'UserNameDefined',
      timestamp,
      aggregate,
      version,
      payload: {
        userName,
      }
    },
    {
      type: 'UserPasswordDefined',
      timestamp,
      aggregate,
      version,
      payload: {
        password,
      }
    },
  ]
}

module.exports = createUser