(async () => {
    const CommandBus = require('./write-site/infrastructure/commandBus')
    const commandBus = new CommandBus()
    await commandBus.init()
    commandBus.handle({
        name: 'createUser',
        payload: {
            userName: 'testUserName',
            password: 'testPassword',
        }
    })
})()

