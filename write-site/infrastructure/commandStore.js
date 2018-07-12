const EventEmitter = require('events')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commandSchema = new Schema({
    name: String,
    commandId: String,
    aggregateId: String,
    version: Number,
    timestamp: Date,
    payload: Object,
}, { versionKey: false })

// commandSchema.index({ aggregateId: 1, version: 1}, { unique: true })
commandSchema.index({ aggregateId: 1, commandId: 1 }, { unique: true })

const Command = mongoose.model('Command', commandSchema)

class CommandStore extends EventEmitter {
    async connect() {
        return mongoose.connect('mongodb://localhost:27017/event-source', { useNewUrlParser: true })
    }
    async saveCommand(command) {
        const { aggregateId, version } = command
        const aggregateIdAndVersionUnique = await Command.count({ aggregateId, version })
        if (aggregateIdAndVersionUnique > 0) {
            throw new Error('duplicate aggregateId and version')
        }
        return Command.create(command)
    }
}

module.exports = CommandStore