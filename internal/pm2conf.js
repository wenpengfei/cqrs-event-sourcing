const glob = require("glob")
const fse = require('fs-extra')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

glob("src/commandHandlers/**/*.js", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, commandName] = item.split('/')
        return {
            moduleName,
            commandName: commandName.split('.')[0],
            filePath: `./${item}`
        }
    })
    const source = fs.readFileSync(path.resolve(__dirname, './template/command.development.hbs'), 'utf8')
    const content = Handlebars.compile(source)(arr)
    fse.outputFileSync('pm2/command.development.json', content)
})

glob("src/eventHandlers/**/*.js", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, eventName, roleName] = item.split('/')
        return {
            moduleName,
            eventName: eventName,
            filePath: `./${item}`,
            roleName: roleName.split('.')[0]
        }
    })
    const source = fs.readFileSync(path.resolve(__dirname, './template/event.development.hbs'), 'utf8')
    const content = Handlebars.compile(source)(arr)
    fse.outputFileSync('pm2/event.development.json', content)
})
