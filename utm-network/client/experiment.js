const fs = require('fs')
//const users = require('./data/users.json')
const invoke = require('./invoke')

const startNumber = parseInt(process.argv[2], 10) || 0
const userLength = parseInt(process.argv[3], 10) || 1
const numOfOrgs = parseInt(process.argv[4], 10) || 1
const resultDir = process.argv[5] || 'test'

const users = require(`./data/users${userLength}.json`)

const resultFile = `results/${resultDir}/node${numOfOrgs}-user${userLength}`

fs.writeFileSync(resultFile, 'id status time\n')

//for (let i = startNumber; i < (startNumber + userLength); i++) {
for (let i = 0; i < userLength; i++) {
  console.log("------------------------------------------------")
  console.log(`i=${i}, startNumber=${startNumber}, userLength=${userLength}`)
  console.log("------------------------------------------------")
  const user = users[i]
  const id = i - startNumber + 1
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
}
