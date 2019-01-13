const fs = require('fs')
const testUser = require('./data/testUser.json')
const users = require('./data/users.json')
const invoke = require('./invoke')

const maxUsers = process.argv[2] || 1
const numOfOrgs = process.argv[3] || 1

const now = Math.floor(Date.now() / 1000)

const resultFile = `results/org${numOfOrgs}-user${maxUsers}-${now}`

fs.writeFileSync(resultFile, 'id status time\n')

//chaincode containerを事前起動するためのinvoke
console.log('Pre invoke: \n')
invoke
  .exec(testUser)
  .then(function(res) {
    console.log(`success: ${res}`)
  })
  .catch(function(err) {
    console.error(`error: ${err}`)
  })

//本番
for (let i = 0; i < maxUsers; i++) {
  const user = users[i]
  invoke
    .exec(user)
    .then(function(res) {
      console.log(`success: ${res}`)
      fs.appendFileSync(resultFile, `${i + 1} success ${JSON.stringify(res)}\n`)
    })
    .catch(function(err) {
      console.error(`error: ${err}`)
      fs.appendFileSync(resultFile, `${i + 1} error ${JSON.stringify(err)}\n`)
    })
}
