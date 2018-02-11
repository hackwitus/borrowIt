const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')
const moment = require('moment')
require('dotenv').load()

function requestDB(options) {
  return rp({
    method: 'POST',
    url: process.env.HDB_ADMIN_URL,
    headers: {
      "content-type": "application/json",
      "authorization": 'Basic ' + new Buffer(process.env.HDB_ADMIN_USERNAME + ':' + process.env.HDB_ADMIN_PASSWORD).toString('base64')
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