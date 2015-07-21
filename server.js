const brick = require('brick-server')
const walk = require('fs-walk')
const path = require('path')
const http = require('http')

const pkg = require('./pkg')

module.exports = serve

// start the server
// null -> null
function serve (args) {
  const port = args.port
  const server = http.createServer(function (req, res) {
    // return dir structure
    if (req.url === '/blob') {
      return readDir(function (blob) {
        res.end(blob.toString())
      })
    }

    // return static files
    const staticHandler = brick(pkg)
    staticHandler(req, res)
  })

  server.listen(port, function (err) {
    if (err) return console.log(err)
    console.log('port: %s', port)
    console.log('env: %s', process.env.NODE_ENV)
  })
}

// read the current directory
// and output it as JSON
// fn(obj) -> null
function readDir (cb) {
  const arr = []
  walk.walk(path.resolve('./'), walkFn, end)

  // recursively walk the current directory
  // and push to arr
  // (str, str, obj, fn) -> null
  function walkFn (basedir, filename, stat, next) {
    arr.push(path.join(basedir, filename))
    next()
  }

  // call when walk ends
  // str? -> null
  function end (err) {
    if (err) console.log(err)
    cb(arr)
  }
}
