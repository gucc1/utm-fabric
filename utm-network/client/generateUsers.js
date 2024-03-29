const fs = require('fs')

const startTime = Math.floor(Date.now() / 1000)
const numOfUsers= parseInt(process.argv[2], 10) || 0
const routeLength=100

let plans = []
for (let user = 0; user <= numOfUsers; user++) {
  let plan = {
    name: `user${user}`,
    flightPlan: []
  }
	let flightTime = startTime
  for(let point=0; point < routeLength; point++){
		plan.flightPlan.push({
			time: startTime.toString(),
			area: user.toString().padStart(7,`0`) + point.toString().padStart(7, `0`)
		})
		flightTime++
  }
	plans.push(plan)
}

fs.writeFileSync(`data/users${numOfUsers}.json`, JSON.stringify(plans))
