const fs = require('fs')
const users = require('./users.json')
const invoke = require('./invoke')

fs.writeFileSync('res.txt', 'status time\n')

users.forEach(user => {
  invoke
    .exec(user)
    .then(function(res) {
      console.log(`success: ${res}`)
      fs.appendFileSync('res.txt', `success ${JSON.stringify(res)}\n`)
    })
    .catch(function(err) {
      console.error(`error: ${err}`)
      fs.appendFileSync('res.txt', `error ${JSON.stringify(err)}\n`)
    })
})
