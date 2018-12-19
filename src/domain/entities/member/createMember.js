const { DomainError } = require('cqrs-lite')
const events = require('../../../infrastructure/events')

const createMember = () => {
  return {
    type: events.memberCreated,
    payload: {
    }
  }
}

module.exports = createMember