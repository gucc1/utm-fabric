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
  const deltaLat = Math.abs(goalLat - startLat)
  const deltaLng = Math.abs(goalLng - startLng)

  let flightPoints = []
  if (deltaLat > deltaLng) {
    if (startLat < goalLat) {
      for (let i = startLat; i < goalLat; i++) {
        const point = {
          area: '' + i + calc(deltaLng / deltaLat, startLat, startLng, i) + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    } else if (startLat > goalLat) {
      for (let i = goalLat; startLat < i; i--) {
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
      for (let i = startLng; i < goalLng; i++) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    } else if (startLng > goalLng) {
      for (let i = goalLng; startLng < i; i--) {
        const point = {
          area: '' + calc(deltaLat / deltaLng, startLng, startLat, i) + i + '',
          time: '' + startTime
        }
        flightPoints.push(point)
        startTime++
      }
    }
  }
  return flightPoints
}

const createPositionId = function(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min) * 10000)
}

exports.createFlightPlan = createFlightPlan
exports.createPositionId = createPositionId
