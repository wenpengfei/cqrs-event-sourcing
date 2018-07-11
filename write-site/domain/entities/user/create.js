const createUser = (userId, userName, password) => {
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