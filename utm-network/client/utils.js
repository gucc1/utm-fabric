function calc(delta, x0, y0, x) {
  return Math.floor(delta * (x - x0) + y0)
}
const createFlightPlan = function(
  startLat,
  startLng,
  goalLat,
  goalLng,
  startTime
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
      console.log('1')
      for (let i = startLat; i < goalLat; i++) {
        const point = {
          area: '' + i + calc(deltaLng / deltaLat, startLat, startLng, i) + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    } else if (startLat > goalLat) {
      console.log('2')
      for (let i = startLat; goalLat < i; i--) {
        const point = {
          area: '' + i + calc(deltaLng / deltaLat, startLat, startLng, i) + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    }
  } else if (deltaLat < deltaLng) {
    if (startLng < goalLng) {
      console.log('3')
      for (let i = startLng; i < goalLng; i++) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    } else if (startLng > goalLng) {
      console.log('4')
      for (let i = startLng; goalLng < i; i--) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    }
  }
  console.log(flightPoints)
  return flightPoints
}

const createPositionId = function(min, max) {
  return Math.floor((Math.random() * (max - min) + min) * 10000)
}

exports.createFlightPlan = createFlightPlan
exports.createPositionId = createPositionId
