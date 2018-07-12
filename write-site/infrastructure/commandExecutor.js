const EventEmitter = require('events')
const DomainError = require('../domain/DomainError')
const CommandBus = require('./commandBus')
const EventBus = require('./eventBus')
const EventStore = require('./eventStore')
const CommandStore = require('./commandStore')
const createEvents = require('./createEvents')

class CommandExecutor extends EventEmitter {
    // constructor(options) {
    //     const { commandBusUrl, eventBusUrl, eventStoreUrl, commandStore } = options
    //     this._commandBusUrl = commandBusUrl
    //     this._eventBusUrl = eventBusUrl
    //     this._eventStoreUrl = eventStoreUrl
    //     this._commandStore = commandStore
    // }
    async init() {
        const commandBus = new CommandBus()
        await commandBus.connect()
        this.commandBus = commandBus

        const eventBus = new EventBus()
        await eventBus.connect()
        this.eventBus = eventBus

        const eventStore = new EventStore()
        await eventStore.connect()
        this.eventStore = eventStore

        const commandStore = new CommandStore()
        await commandStore.connect()
        this.commandStore = commandStore

        this.emit('connected')
    }

    execute(commandName, executor) {
        this.commandBus.startListening(commandName, async (message) => {
            const command = JSON.parse(message.content.toString())
            try {
                await this.commandStore.saveCommand(command);
                const domainEvents = executor.call(this, command, message)
                const events = createEvents(command, domainEvents)
                this.eventStore.saveEventStream(events)
                this.commandBus.ack(message)
            } catch (error) {
                if (error.message) {
                    if (error.message.indexOf('duplicate key error') !== -1) {
                        console.log(['CommandExecutor', 'Unique Error', 'command duplicate, command rejected'])
                        this.commandBus.ack(message)
                    }
                    if (error.message.indexOf('duplicate aggregateId and version') !== -1) {
                        console.log(['CommandExecutor', 'Unique Error', 'version duplicate, command rejected'])
                        this.commandBus.ack(message)
                    }
                }
                if (error instanceof DomainError) {
                    console.log(['CommandExecutor', 'DomainError'], error)
                    this.commandBus.ack(message)
                }
            }
        })
    }
}

module.exports = CommandExecutor