const horsey = require('horsey')

const el = document.createElement('input')
document.body.appendChild(el)

horsey(el, {
  suggestions: ['foo', 'bar']
})
