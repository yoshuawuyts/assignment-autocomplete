const browserify = require('browserify')
const brick = require('brick-router')
const watchify = require('watchify')
const cssnext = require('cssnext')
const path = require('path')
const fs = require('fs')

const router = brick()

module.exports = router

const root = path.join(path.dirname(require.main.filename), '..')

var b = browserify({
  cache: {},
  packageCache: {},
  entries: [path.join(root, 'index.js')],
  fullPaths: true
})
if (process.env.NODE_ENV === 'development') b = watchify(b)

// browserify bundle
router.on('/bundle.js', function (cb) {
  cb(null, b.bundle())
})

// css bundle
router.on('/bundle.css', function (cb) {
  const source = path.join(root, 'css/index.css')
  fs.readFile(source, function (err, data) {
    if (err) return cb(err)
    const res = cssnext(data.toString(), { from: source })
    cb(null, res)
  })
})

// index.html OR /
router.on('/index.html', function (cb) {
  const htmlloc = path.join(root, 'html/index.html')
  const htmlstream = fs.createReadStream(htmlloc)
  cb(null, htmlstream)
})
