const CommandBus = require('../../infrastructure/commandBus')
const EventBus = require('../../infrastructure/eventBus')
const EventStore = require('../../infrastructure/eventStore')
const CommandStore = require('../../infrastructure/commandStore')

const createEvents = require('../../infrastructure/createEvents')
const commands = require('../../infrastructure/commands')
const createUser = require('../../domain/entities/user/create')

const commandBus = new CommandBus()
const eventBus = new EventBus()
const eventStore = new EventStore()
const commandStore = new CommandStore()
commandBus.connect()

commandBus.on('connected', async () => {
    await eventBus.connect()
    await eventStore.connect()
    await commandStore.connect()
    commandBus.startListening(commands.createUser, async (message) => {
        const command = JSON.parse(message.content.toString())
        const { userName, password, userId } = command.payload
        try {
            await commandStore.saveCommand(command);
            const domainEvents = createUser(userId, userName, password)
            const event = createEvents(command, domainEvents)
            await eventStore.saveEventStream(event)
            const publish = await eventBus.publish({
                exchangeName: commands.createUser, 
                routeKey: commands.createUser,
                message: JSON.stringify(event), 
            })
            if (publish) {
                commandBus.ack(message)
            }
        } catch (error) {
            console.log(error)
        }
    })
})






