const fs = require('fs')
const utils = require('./utils')
const invoke = require('./invoke')

const numOfUsers = 1
const minLat = 37.4806162
const maxLat = 37.529089
const minLng = 139.912265
const maxLng = 139.95149

const startTime = Math.floor(Date.now() / 1000)

let users = []
for (let i = 0; i < numOfUsers; i++) {
  let user = {
    name: `user${i}`,
    flightPlan: []
  }
  user.flightPlan = utils.createFlightPlan(
    utils.createPositionId(minLat, maxLat),
    utils.createPositionId(minLng, maxLng),
    utils.createPositionId(minLat, maxLat),
    utils.createPositionId(minLng, maxLng),
    startTime
  )
  users.push(user)
}

fs.writeFileSync('users.json', JSON.stringify(users))

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
