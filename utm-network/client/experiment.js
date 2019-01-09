const fs = require('fs')

const invoke = require('./invoke')
let users = require('./users.json')

users.forEach(function(user) {
  invoke
    .exec(user)
    .then(function(res) {
      console.log(`success: ${res}`)
    })
    .catch(function(err) {
      console.error(`error: ${err}`)
    })
})
