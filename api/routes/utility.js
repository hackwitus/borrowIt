const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')
const moment = require('moment')
require('dotenv').load()

function requestDB(options, creds) {
  const authorization = creds ? 
    'Basic ' + new Buffer(creds.username + ':' + creds.password ).toString('base64') :
    'Basic ' + new Buffer(process.env.HDB_CUSTOMER_USERNAME + ':' + process.env.HDB_CUSTOMER_PASSWORD).toString('base64')
  return rp({
    method: 'POST',
    url: process.env.HDB_URL,
    headers: {
      "content-type": "application/json",
      "authorization": authorization
    },
    body: options || {},
    json: true
  })
}

function getID() {
  return uuidv1()
}

function getDate() {
  return moment().format()
}

module.exports.requestDB = requestDB
module.exports.getID = getID
module.exports.getDate = getDate