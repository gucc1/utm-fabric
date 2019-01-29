const fs = require('fs')
const invoke = require('./invoke')

const userLength = parseInt(process.argv[2], 10) || 1
const numOfOrgs = parseInt(process.argv[3], 10) || 1
const resultDir = process.argv[4] || 'dev'

const users = require(`./data/users${userLength}.json`)
const now = new Date()

const resultFile = `results/${resultDir}/node${numOfOrgs}/user${userLength}-${now.getMonth()+1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`

fs.writeFileSync(resultFile, 'id status time\n')
// Pre invoke because peer needs to prepare chaincode docker at first invoke
let invokes = []
for (let i = 0; i < userLength; i++) {
	const user = users[i]
	const id = i + 1
	invokes.push(
		invoke
			.exec(user)
			.then(function(res) {
				console.log(`success: ${res}`)
				fs.appendFileSync(resultFile, `${id} success ${JSON.stringify(res)}\n`)
			})
			.catch(function(err) {
				console.error(`error: ${err}`)
				fs.appendFileSync(resultFile, `${id} error ${JSON.stringify(err)}\n`)
			})
	)
}

Promise.all(invokes)
