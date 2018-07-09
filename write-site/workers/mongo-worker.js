(async () => {
    const { PubSubQueue } = require('rabbitmq-processer')
    const pubSubQueue = new PubSubQueue({ exchangeName: 'events' })
    await pubSubQueue.connect()
    
    pubSubQueue.subscribe(message => {
        console.log(message.content.toString())
    })
})()