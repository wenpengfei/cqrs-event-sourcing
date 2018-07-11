const EventEmitter = require('events')
const mongoose = require('mongoose')

const Command = mongoose.model('Command', {
    name: String,
    commandId: String,
    aggregateId: String,
    version: Number,
    timestamp: Date,
    payload: Object,
})

class CommandStore extends EventEmitter {
    async connect() {
        return mongoose.connect('mongodb://localhost:27017/event-source', { useNewUrlParser: true })
    }
    async saveCommand(command) {
        return Command.create(command)
    }
}

module.exports = CommandStore