const fs = require('fs')
const calc = function calc(delta, x0, y0, x) {
  return Math.floor(delta * (x - x0) + y0)
}
const createFlightPlan = function(
  startLat,
  startLng,
  goalLat,
  goalLng,
  startTime,
  reservedPoint = {}
) {
  console.log(`start: ${startLat}, ${startLng}`)
  console.log(`goal: ${goalLat}, ${goalLng}`)
  console.log(`startTime: ${startTime}`)
  const deltaLat = Math.abs(goalLat - startLat)
  const deltaLng = Math.abs(goalLng - startLng)
  console.log(`deltaLat: ${deltaLat}`)
  console.log(`deltaLng: ${deltaLng}`)

  let flightPoints = []
  if (deltaLat > deltaLng) {
    if (startLat < goalLat) {
      for (let i = startLat; i < goalLat; i++) {
        const point = {
          area: '' + i + calc(deltaLng / deltaLat, startLat, startLng, i) + '',
          time: '' + startTime
        }
        const key = `${point.area}${point.time}`
        if (reservedPoint.hasOwnProperty(key)) {
          flightPoints = []
          break
        } else {
          flightPoints.push(point)
          reservedPoint[key] = 'reserved'
          startTime++
        }
      }
    } else if (startLat > goalLat) {
      for (let i = startLat; goalLng < i; i--) {
        const point = {
          area: '' + i + calc(deltaLng / deltaLat, startLat, startLng, i) + '',
          time: '' + startTime
        }
        // flightPoints.push(point)
        // startTime++
        const key = `${point.area}${point.time}`
        if (reservedPoint.hasOwnProperty(key)) {
          flightPoints = []
          break
        } else {
          flightPoints.push(point)
          reservedPoint[key] = 'reserved'
          startTime++
        }
      }
    }
  } else if (deltaLat < deltaLng) {
    if (startLng < goalLng) {
      for (let i = startLng; i < goalLng; i++) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        // flightPoints.push(point)
        // startTime++
        const key = `${point.area}${point.time}`
        if (reservedPoint.hasOwnProperty(key)) {
          flightPoints = []
          break
        } else {
          flightPoints.push(point)
          reservedPoint[key] = 'reserved'
          startTime++
        }
      }
    } else if (startLng > goalLng) {
      for (let i = startLng; goalLng < i; i--) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        // flightPoints.push(point)
        // startTime++
        const key = `${point.area}${point.time}`
        if (reservedPoint.hasOwnProperty(key)) {
          flightPoints = []
          break
        } else {
          flightPoints.push(point)
          reservedPoint[key] = 'reserved'
          startTime++
        }
      }
    }
  }
  return [flightPoints, reservedPoints]
}

const createPositionId = function(min, max) {
  return Math.floor((Math.random() * (max - min) + min) * 10000)
}

const numOfUsers = 100001
const minLat = 37.4806162
const maxLat = 37.529089
const minLng = 139.912265
const maxLng = 139.95149

const startTime = Math.floor(Date.now() / 1000)

let users = []
let reservedPoints = {}
for (let i = 0; i < numOfUsers; i++) {
  let user = {
    name: `user${i}`,
    flightPlan: []
  }
  while (true) {
    const res = createFlightPlan(
      createPositionId(minLat, maxLat),
      createPositionId(minLng, maxLng),
      createPositionId(minLat, maxLat),
      createPositionId(minLng, maxLng),
      startTime,
      reservedPoints
    )
    if (res[0].length > 0) {
      user.flightPlan = res[0]
      reservedPoints = res[1]
      users.push(user)
      break
    }
  }
}

fs.writeFileSync('data/users.json', JSON.stringify(users))
