const commands = require('../../infrastructure/commands')
const createUser = require('../../domain/entities/user/create')
const CommandExecutor = require('../../infrastructure/commandExecutor')

const commandExecutor = new CommandExecutor()
commandExecutor.init()

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.createUser, function (command, message) {
        const { userId, userName, password } = command.payload
        return createUser(userId, userName, password)
    })
})



