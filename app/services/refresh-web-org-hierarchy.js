const ipAdresses = require('../config').ipAdresses
const rp = require('request-promise')
const log = require('./log')

module.exports = function () {
  ipAdresses.forEach(function (ipAddress) {
    rp(ipAddress + '/refresh')
      .then(function (response) {
        log.info(ipAddress + ' successfully refreshed')
      })
      .catch(function (err) {
        log.error('Cannot refresh hierarchy for ' + ipAddress)
        log.error(err)
      })
  })
}
