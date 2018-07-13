const commands = require('../../infrastructure/commands')
const CommandExecutor = require('../../infrastructure/commandExecutor')
const createUser = require('../../domain/entities/user/create')

const commandExecutor = new CommandExecutor()
commandExecutor.init()

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createUser, function (command, message) {
        const { userId, userName, password } = command.payload
        return createUser(userId, userName, password)
    })
})

