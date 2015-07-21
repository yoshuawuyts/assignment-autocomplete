const horsey = require('horsey')
const nets = require('nets')

// create el
const el = document.createElement('input')
document.body.appendChild(el)

const url = 'http://localhost:1337/blob'

// mount the autocomplete component
horsey(el, {
  suggestions: function (done) {
    fetchBlob(done)
  },
  render: function (li, suggestion) {
    li.innerHTML = suggestion
  }
})

// fetch the blob from the server
// fn(obj) -> null
function fetchBlob (cb) {
  const opts = { url: url, json: true }
  nets(opts, function (err, resp, body) {
    if (err) return console.error(err)
    console.log(body)
    cb(body)
  })
}
