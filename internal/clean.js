const shell = require('shelljs')

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
}

console.log('Cleanup started...')
shell.rm('-rf', 'src/commandHandlers/*')
shell.rm('-rf', 'src/domain/*')
shell.rm('-rf', 'pm2/*')
shell.rm('-rf', 'src/eventHandlers/*')
shell.rm('-rf', 'src/infrastructure/commands.ts')
shell.rm('-rf', 'src/infrastructure/events.ts')
// shell.rm('-rf', '.git')
// shell.rm('-rf', 'node_modules/')
console.log('Cleanup finished...')

