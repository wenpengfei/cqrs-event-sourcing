const createUser = (userName, password) => {
  const timestamp = new Date()

  if (!userName) {
    throw '用户名不能为空'
  }

  if (!password) {
    throw '密码不能为空'
  }

  return [
    {
      type: 'UserCreated',
      payload: {
        userId: 1,
        timestamp
      }
    },
    {
      type: 'UserNameDefined',
      payload: {
        userName,
        timestamp
      }
    },
    {
      type: 'UserPasswordDefined',
      payload: {
        password,
        timestamp
      }
    }
  ]
}

module.exports = createUser