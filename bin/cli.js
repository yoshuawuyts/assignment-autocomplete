const cliclopts = require('cliclopts')
const minimist = require('minimist')
const fs = require('fs')

const server = require('../server')
const pkg = require('../pkg')

const copts = cliclopts([
  {
    name: 'port',
    abbr: 'p',
    default: 1337,
    help: 'port for the server to listen on'
  }
])

const argv = minimist(process.argv.slice(2), copts.options())
const cmd = argv._[0]

// help
if (argv.help || !cmd) {
  console.log('Usage: command [options]')
  copts.print()
  console.log('\n')
  console.log(fs.readFileSync(__dirname + '/cmds.txt', 'utf8'))
  process.exit()
}

// listen
if (cmd === 'start') server({ port: argv.port })

// build
if (cmd === 'build') {
  pkg.build('dist', function (err, res) {
    if (err) {
      console.log('error:', err)
      process.exit(1)
    }
    process.exit()
  })
}
