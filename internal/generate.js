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

const args = { moduleName, commandName, eventName }

const commandContent = handlebars.compile(commandSource)(args)
const domainContent = handlebars.compile(domainEventSource)(args)
const reducerContent = handlebars.compile(reducerSource)(args)
const eventHandlerMysqlContent = handlebars.compile(eventHandlerSource)({ ...args, db: 'mysql' })
const eventHandlerElasticSearchContent = handlebars.compile(eventHandlerSource)({ ...args, db: 'elasticsearch' })

fse.outputFileSync(`src/commandHandlers/${moduleName}/${commandName}.js`, commandContent)
fse.outputFileSync(`src/domain/entities/${moduleName}/${commandName}.js`, domainContent)
fse.outputFileSync(`src/domain/reducers/${moduleName}.js`, reducerContent)
fse.outputFileSync(`src/eventHandlers/${moduleName}/${eventName}/mysql.js`, eventHandlerMysqlContent)
fse.outputFileSync(`src/eventHandlers/${moduleName}/${eventName}/elasticsearch.js`, eventHandlerElasticSearchContent)

// commands
glob("src/commandHandlers/**/*.js", {}, function (error, files) {
    if (files.length > 0) {
        const commands = files.map(item => {
            const [, , , file] = item.split('/')
            const [command] = file.split('.')
            return command
        })
        const dictionaryContent = handlebars.compile(dictionarySource)(commands)
        fse.outputFileSync(`src/infrastructure/commands.js`, dictionaryContent)
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
        fse.outputFileSync(`src/infrastructure/events.js`, dictionaryContent)
    }
})
