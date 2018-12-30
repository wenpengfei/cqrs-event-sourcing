const glob = require("glob")
const fse = require('fs-extra')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

glob("src/commandHandlers/**/*.ts", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, commandName] = item.split('/')
        return {
            moduleName,
            commandName: commandName.split('.')[0],
            filePath: `./${item}`
        }
    })
    const devSource = fs.readFileSync(path.resolve(__dirname, './template/command.development.hbs'), 'utf8')
    const devContent = Handlebars.compile(devSource)(arr)
    fse.outputFileSync('pm2/command.development.json', devContent)

    const prodSource = fs.readFileSync(path.resolve(__dirname, './template/command.production.hbs'), 'utf8')
    const prodContent = Handlebars.compile(prodSource)(arr)
    fse.outputFileSync('pm2/command.production.json', prodContent)
})

glob("src/eventHandlers/**/*.ts", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, eventName, roleName] = item.split('/')
        return {
            moduleName,
            eventName: eventName,
            filePath: `./${item}`,
            roleName: roleName.split('.')[0]
        }
    })
    const devSource = fs.readFileSync(path.resolve(__dirname, './template/event.development.hbs'), 'utf8')
    const devContent = Handlebars.compile(devSource)(arr)
    fse.outputFileSync('pm2/event.development.json', devContent)

    const prodSource = fs.readFileSync(path.resolve(__dirname, './template/event.production.hbs'), 'utf8')
    const prodContent = Handlebars.compile(prodSource)(arr)
    fse.outputFileSync('pm2/event.production.json', prodContent)
})



glob("dist/src/commandHandlers/**/*.js", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, commandName] = item.split('/')
        return {
            moduleName,
            commandName: commandName.split('.')[0],
            filePath: `./${item}`
        }
    })
    const prodSource = fs.readFileSync(path.resolve(__dirname, './template/command.production.hbs'), 'utf8')
    const prodContent = Handlebars.compile(prodSource)(arr)
    fse.outputFileSync('pm2/command.production.json', prodContent)
})

glob("dist/src/eventHandlers/**/*.js", {}, function (error, files) {
    const arr = files.map(item => {
        const [, , moduleName, eventName, roleName] = item.split('/')
        return {
            moduleName,
            eventName: eventName,
            filePath: `./${item}`,
            roleName: roleName.split('.')[0]
        }
    })
    const prodSource = fs.readFileSync(path.resolve(__dirname, './template/event.production.hbs'), 'utf8')
    const prodContent = Handlebars.compile(prodSource)(arr)
    fse.outputFileSync('pm2/event.production.json', prodContent)
})