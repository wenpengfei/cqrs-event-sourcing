const events = require('../../../infrastructure/events')
const updateUserProfile = (userId, userName, password) => {
  const timestamp = new Date()
  return {
    type: events.userProfileUpdated,
    payload: {
      userId,
      userName,
    }
  }
}
module.exports = updateUserProfile