const createEvents = (command, events) => {
    if (!Array.isArray(events)) {
        throw 'arg events must be an array'
    }
    const { commandId, aggregateId, version, timestamp } = command
    return events.map(item => {
        return {
            commandId,
            aggregateId,
            version,
            timestamp,
            ...item
        }
    })
}

module.exports = createEvents