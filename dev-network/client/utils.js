const createFlightPlan = function(
  startLat,
  startLng,
  goalLat,
  goalLng,
  startTime //unixtimeを1000倍した値
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
  consoleLog(points)
}

exports.createFlightPlan = createFlightPlan
