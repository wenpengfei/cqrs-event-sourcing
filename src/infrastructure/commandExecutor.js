const EventEmitter = require('events')
const DomainError = require('../domain/DomainError')
const CommandBus = require('./commandBus')
const EventBus = require('./eventBus')
const EventStore = require('./eventStore')
const CommandStore = require('./commandStore')
const createEvent = require('./createEvent')
const debug = require('debug')('commandExecutor')
const R = require('ramda');

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
                const event = createEvent(command, domainEvents)
                await this.eventStore.saveEventStream(event)
                await this.eventBus.publish({
                    exchangeName: event.type,
                    routeKey: event.type,
                    message: R.dissoc('_id', event)
                })
                this.commandBus.ack(message)
            } catch (error) {
                debug(error.message)
                console.error(error)
                if (error.message) {
                    if (error.message.indexOf('duplicate key error') !== -1) {
                        this.commandBus.ack(message)
                    }
                    if (error.message.indexOf('illegal command version') !== -1) {
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