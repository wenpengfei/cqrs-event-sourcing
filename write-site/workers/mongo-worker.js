(async () => {
    const { PubSubQueue } = require('rabbitmq-processer')
    const pubSubQueue = new PubSubQueue({ exchangeName: 'events' })
    await pubSubQueue.connect()
    
    pubSubQueue.subscribe('domain.events', 'domain.events', message => {
        console.log(message.content.toString())
    })
})()