const CommandBus = require('../../infrastructure/commandBus')
const EventBus = require('../../infrastructure/eventBus')

const createEvents = require('../../infrastructure/createEvents')
const commands = require('../../infrastructure/commands')
const createUser = require('../../domain/entities/user/create')

const commandBus = new CommandBus()
const eventBus = new EventBus()

commandBus.connect()

commandBus.on('connected', async () => {
    console.log(`commandBus: ${commands.createUser} connected`)
    await eventBus.connect()
    commandBus.startListening(commands.createUser, async (message) => {
        const command = JSON.parse(message.content.toString())
        const { userName, password, userId } = command.payload
        try {
            const event = createUser(userId, userName, password)
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






