const CommandBus = require('./write-site/infrastructure/commandBus')
const commandBus = new CommandBus()
commandBus.connect()
commandBus.on('connected', () => {
    console.log('commandBus connected')
    commandBus.publish('sbQueue', {text: '你是傻逼'})
})

