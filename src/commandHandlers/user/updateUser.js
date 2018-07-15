const commands = require('../../infrastructure/commands')
const CommandExecutor = require('../../infrastructure/commandExecutor')
const updateUser = require('../../domain/entities/user/update')

const commandExecutor = new CommandExecutor()
commandExecutor.init()

commandExecutor.on('connected', () => {
    commandExecutor.execute(commands.updateUser, function (command, message) {
        const { userId, userName, password } = command.payload
        return updateUser(userId, userName, password)
    })
})
