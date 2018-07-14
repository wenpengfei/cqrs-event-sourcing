const EventEmitter = require('events')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    commandId: String,
    aggregateId: String,
    version: Number,
    timestamp: Date,
    type: String,
    payload: Object,
}, { versionKey: false })

eventSchema.index({ aggregateId: 1, version: 1 }, { unique: true })

const Event = mongoose.model('Event', eventSchema)

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