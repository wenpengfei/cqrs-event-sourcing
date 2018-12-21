const shell = require('shelljs')

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
}

process.stdout.write('Cleanup started...')
shell.rm('-rf', 'src/commandHandlers/*')
shell.rm('-rf', 'src/domain/*')
shell.rm('-rf', 'pm2/*')
shell.rm('-rf', 'src/eventHandlers/*')
shell.rm('-rf', 'src/infrastructure/commands.js')
shell.rm('-rf', 'src/infrastructure/events.js')
// shell.rm('-rf', '.git')
// shell.rm('-rf', 'node_modules/')
process.stdout.write('Cleanup finish...')
