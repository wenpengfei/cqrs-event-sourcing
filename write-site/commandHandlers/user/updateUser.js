const CommandBus = require('../../infrastructure/commandBus')
const EventBus = require('../../infrastructure/eventBus')
const commands = require('../../infrastructure/commands')

const commandBus = new CommandBus()
const eventBus = new EventBus()

commandBus.connect()

commandBus.on('connected', async () => {
    console.log(`commandBus: ${commands.updateUser} connected`)
    await eventBus.connect()
    commandBus.startListening(commands.updateUser, (message) => {
        console.log('updateUser receive:', message.content.toString())
        commandBus.ack(message)
    })
})