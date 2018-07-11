const EventEmitter = require('events')
const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
    commandId: String,
    aggregateId: String,
    version: Number,
    timestamp: Date,
    type: String,
    payload: Object,
})

class EventStore extends EventEmitter {
    async connect() {
        return mongoose.connect('mongodb://localhost:27017/event-source', { useNewUrlParser: true })
    }

    async getEventStream(aggregateId) {
        return Event.find({ aggregateId }).sort({ timestamp: 1 })
    }

    async saveEventStream(events) {
        return Event.collection.insert(events)
    }
}

module.exports = EventStore