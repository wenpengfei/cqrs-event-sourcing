const DomainError = require('../../DomainError')

const createUser = (userId, userName, password) => {

  if (!userId) {
    throw new DomainError('用户id不能为空')
  }

  if (!userName) {
    throw new DomainError('用户名不能为空')
  }

  if (!password) {
    throw new DomainError('密码不能为空')
  }

  return [
    {
      type: 'UserCreated',
      payload: {
        userId,
      }
    },
    {
      type: 'UserNameDefined',
      payload: {
        userName,
      }
    },
    {
      type: 'UserPasswordDefined',
      payload: {
        password,
      }
    },
  ]
}

module.exports = createUser