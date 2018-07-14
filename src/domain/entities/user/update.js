const updateUser = (userId, userName, password) => {
  const timestamp = new Date()
  return [
    {
      type: 'UserNameUpdated',
      payload: {
        userName,
        timestamp
      }
    },
    {
      type: 'UserPasswordUpdated',
      payload: {
        password,
        timestamp
      }
    }
  ]
}

module.exports = updateUser