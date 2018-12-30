const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const handlebars = require('handlebars')
const glob = require('glob')

require('handlebars-helpers')({ handlebars })
const [, , moduleName, commandName, eventName] = process.argv

const commandSource = fs.readFileSync(path.resolve(__dirname, './template/commandHandler.hbs'), 'utf8')
const domainEventSource = fs.readFileSync(path.resolve(__dirname, './template/domainEvent.hbs'), 'utf8')
const reducerSource = fs.readFileSync(path.resolve(__dirname, './template/reducer.hbs'), 'utf8')
const eventHandlerSource = fs.readFileSync(path.resolve(__dirname, './template/eventHandler.hbs'), 'utf8')
const dictionarySource = fs.readFileSync(path.resolve(__dirname, './template/dictionary.hbs'), 'utf8')
const typeSource = fs.readFileSync(path.resolve(__dirname, './template/types.hbs'), 'utf8')

const args = { moduleName, commandName, eventName }

const commandContent = handlebars.compile(commandSource)(args)
const domainContent = handlebars.compile(domainEventSource)(args)
const reducerContent = handlebars.compile(reducerSource)(args)
const typeContent = handlebars.compile(typeSource)(args)
const eventHandlerMysqlContent = handlebars.compile(eventHandlerSource)({ ...args, db: 'mysql' })
const eventHandlerElasticSearchContent = handlebars.compile(eventHandlerSource)({ ...args, db: 'elasticsearch' })

fse.outputFileSync(`src/commandHandlers/${moduleName}/${commandName}.ts`, commandContent)
fse.outputFileSync(`src/domain/entities/${moduleName}/${commandName}.ts`, domainContent)
fse.outputFileSync(`src/domain/reducers/${moduleName}.ts`, reducerContent)
fse.outputFileSync(`src/eventHandlers/${moduleName}/${eventName}/mysql.ts`, eventHandlerMysqlContent)
// fse.outputFileSync(`src/eventHandlers/${moduleName}/${eventName}/elasticsearch.ts`, eventHandlerElasticSearchContent)

const entityTypePath = `src/domain/types/${moduleName}.ts`
fs.exists(entityTypePath, function (exists) {
    if (!exists) {
        fse.outputFileSync(entityTypePath, typeContent)
    }
})
// commands
glob("src/commandHandlers/**/*.ts", {}, function (error, files) {
    if (files.length > 0) {
        const commands = files.map(item => {
            const [, , , file] = item.split('/')
            const [command] = file.split('.')
            return command
        })
        const dictionaryContent = handlebars.compile(dictionarySource)(commands)
        fse.outputFileSync(`src/infrastructure/commands.ts`, dictionaryContent)
    }
})

// events
glob("src/eventHandlers/*/*/", {}, function (error, files) {
    if (files.length > 0) {
        const events = files.map(item => {
            const [, , , event] = item.split('/')
            return event
        })
        const dictionaryContent = handlebars.compile(dictionarySource)(events)
        fse.outputFileSync(`src/infrastructure/events.ts`, dictionaryContent)
    }
})
