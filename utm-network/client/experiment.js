const fs = require('fs')
const utils = require('./utils')
const invoke = require('./invoke')

const numOfUsers = 100
const minLat = 0
const maxLat = 0
const minLng = 0
const maxLng = 0
const startTime = Date.now() / 1000

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

// invoke
//   .invoke()
//   .then(function() {})
//   .catch(function() {})
