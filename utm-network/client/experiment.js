const fs = require('fs')
const users = require('./data/users.json')
const invoke = require('./invoke')

const maxUsers = process.argv[2] || 1
const numOfOrgs = process.argv[3] || 1
const resultDir = process.argv[4] || Math.floor(Date.now() / 1000)

const resultFile = `results/${resultDir}/org${numOfOrgs}-user${maxUsers}`

fs.writeFileSync(resultFile, 'id status time\n')

//chaincode containerを事前起動するためのinvoke
console.log('========PRE INVOKE========')
invoke
  .exec(users[0])
  .then(function(res) {
    console.log('==========================')
    console.log(`success: ${res}`)
    //本番
    console.log('========INVOKE========')
    for (let i = 1; i <= maxUsers; i++) {
      const user = users[i]
      invoke
        .exec(user)
        .then(function(res) {
          console.log(`success: ${res}`)
          fs.appendFileSync(resultFile, `${i} success ${JSON.stringify(res)}\n`)
        })
        .catch(function(err) {
          console.error(`error: ${err}`)
          fs.appendFileSync(resultFile, `${i} error ${JSON.stringify(err)}\n`)
        })
    }
    console.log('==========================')
  })
  .catch(function(err) {
    console.error(`error: ${err}`)
  })
